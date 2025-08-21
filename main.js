const Serenes = (() => {
  const $ = (sel) => document.querySelector(sel);
  const state = {
    streak: parseInt(localStorage.getItem('serenes_streak') || '0'),
    lastCheckin: localStorage.getItem('serenes_last_checkin') || null,
    daysLogged: parseInt(localStorage.getItem('serenes_days_logged') || '0'),
    reminderTime: localStorage.getItem('serenes_reminder_time') || '10:00',
    notificationsEnabled: localStorage.getItem('serenes_notifications') === 'true',
    notifiedOn: localStorage.getItem('serenes_notified_on') || ''
  };

  function save() {
    localStorage.setItem('serenes_streak', state.streak);
    localStorage.setItem('serenes_last_checkin', state.lastCheckin || '');
    localStorage.setItem('serenes_days_logged', state.daysLogged);
    localStorage.setItem('serenes_reminder_time', state.reminderTime);
    localStorage.setItem('serenes_notifications', state.notificationsEnabled);
    localStorage.setItem('serenes_notified_on', state.notifiedOn);
  }

  function render() {
    const streakBadge = $('#streakBadge');
    const currentStreak = $('#currentStreak');
    const daysLogged = $('#daysLogged');
    const reminderTime = $('#reminderTime');
    const toggleNotifications = $('#toggleNotifications');

    if (streakBadge) streakBadge.textContent = `Streak: ${state.streak}`;
    if (currentStreak) currentStreak.textContent = state.streak;
    if (daysLogged) daysLogged.textContent = state.daysLogged;
    if (reminderTime) reminderTime.value = state.reminderTime;
    if (toggleNotifications) toggleNotifications.textContent = state.notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications';
  }

  function checkin() {
    const today = new Date();
    if (!state.lastCheckin || new Date(state.lastCheckin).toDateString() !== today.toDateString()) {
      state.streak++;
      state.daysLogged++;
      state.lastCheckin = today.toISOString();
      save();
      render();
    } else {
      // Already checked in today
      alert('You already checked in today — great job!');
    }
  }

  function saveReminder() {
    state.reminderTime = $('#reminderTime').value || '10:00';
    save();
    alert('Reminder saved');
  }

  async function requestNotifications() {
    if (!('Notification' in window)) {
      alert('Notifications are not supported in this browser.');
      return;
    }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      state.notificationsEnabled = true;
      save();
      new Notification('🌱 Serenes Reminder', { body: "You'll get daily notifications!" });
    } else {
      state.notificationsEnabled = false;
      save();
    }
    render();
  }

  function startReminderLoop() {
    setInterval(() => {
      if (!state.notificationsEnabled) return;
      const [h, m] = state.reminderTime.split(':').map(Number);
      const now = new Date();
      const today = now.toISOString().slice(0,10);
      if (now.getHours() === h && now.getMinutes() === m && state.notifiedOn !== today) {
        try {
          new Notification('🌱 Serenes Reminder', { body: 'Time to take your Serenes Fruits & Veggies!' });
        } catch (e) {
          console.warn('Notification failed', e);
        }
        state.notifiedOn = today;
        save();
      }
    }, 30000); // check every 30s
  }

  function navigate(id) {
    // Show the requested section, hide others
    const sections = document.querySelectorAll('main > section');
    sections.forEach(s => {
      s.style.display = (s.id === id) ? '' : 'none';
    });

    // Update tabbar active state
    document.querySelectorAll('.tabbar button').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === id);
    });

    // Update URL hash without adding history entry
    if (id) {
      history.replaceState(null, '', `#${id}`);
    }
    // ensure viewport top on navigation
    window.scrollTo(0, 0);
  }

  function init() {
    // nav highlighting only (buttons already change .active via navigate)
    document.querySelectorAll('.tabbar button').forEach(btn => {
      btn.addEventListener('click', () => {
        // navigation is handled by the onclick in the markup calling Serenes.navigate
        // keep this to ensure keyboard/mouse interactions still update UI if direct clicks happen
        const id = btn.dataset.tab;
        navigate(id);
      });
    });

    const checkinBtn = $('#checkinBtn');
    if (checkinBtn) checkinBtn.addEventListener('click', checkin);
    const saveReminderBtn = $('#saveReminder');
    if (saveReminderBtn) saveReminderBtn.addEventListener('click', saveReminder);
    const toggleNotificationsBtn = $('#toggleNotifications');
    if (toggleNotificationsBtn) toggleNotificationsBtn.addEventListener('click', () => {
      if (state.notificationsEnabled) {
        state.notificationsEnabled = false;
        save();
        render();
      } else {
        requestNotifications();
      }
    });

    // On load: show section from hash or default to onboarding
    const initial = location.hash ? location.hash.replace('#','') : 'onboarding';
    // If section doesn't exist, fallback to onboarding
    const available = document.getElementById(initial) ? initial : 'onboarding';
    navigate(available);

    render();
    startReminderLoop();
  }

  return { navigate, init };
})();
window.addEventListener('DOMContentLoaded', Serenes.init);
