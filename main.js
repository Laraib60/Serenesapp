<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2299.77">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">const Serenes = (() =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const $ = (sel) =&gt; document.querySelector(sel);</p>
<p class="p1"><span class="Apple-converted-space">  </span>const state = {</p>
<p class="p1"><span class="Apple-converted-space">    </span>streak: parseInt(localStorage.getItem('serenes_streak') || '0'),</p>
<p class="p1"><span class="Apple-converted-space">    </span>lastCheckin: localStorage.getItem('serenes_last_checkin') || null,</p>
<p class="p1"><span class="Apple-converted-space">    </span>daysLogged: parseInt(localStorage.getItem('serenes_days_logged') || '0'),</p>
<p class="p1"><span class="Apple-converted-space">    </span>reminderTime: localStorage.getItem('serenes_reminder_time') || '10:00',</p>
<p class="p1"><span class="Apple-converted-space">    </span>notificationsEnabled: localStorage.getItem('serenes_notifications') === 'true',</p>
<p class="p1"><span class="Apple-converted-space">    </span>notifiedOn: localStorage.getItem('serenes_notified_on') || ''</p>
<p class="p1"><span class="Apple-converted-space">  </span>};</p>
<p class="p2"><br></p>
<p class="p1"><span class="Apple-converted-space">  </span>function save() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>Object.keys(state).forEach(k =&gt; localStorage.setItem('serenes_' + k, state[k]));</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>function render() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#streakBadge').textContent = `Streak: ${state.streak}`;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#currentStreak').textContent = state.streak;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#daysLogged').textContent = state.daysLogged;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#reminderTime').value = state.reminderTime;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#toggleNotifications').textContent = state.notificationsEnabled ? 'Disable Notifications' : 'Enable Notifications';</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>function checkin() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const today = new Date();</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (!state.lastCheckin || new Date(state.lastCheckin).toDateString() !== today.toDateString()) {</p>
<p class="p1"><span class="Apple-converted-space">      </span>state.streak++;</p>
<p class="p1"><span class="Apple-converted-space">      </span>state.daysLogged++;</p>
<p class="p1"><span class="Apple-converted-space">      </span>state.lastCheckin = today.toISOString();</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>save(); render();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>function saveReminder() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>state.reminderTime = $('#reminderTime').value;</p>
<p class="p1"><span class="Apple-converted-space">    </span>save(); alert('Reminder set');</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>async function requestNotifications() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>const perm = await Notification.requestPermission();</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (perm === 'granted') {</p>
<p class="p1"><span class="Apple-converted-space">      </span>state.notificationsEnabled = true; save();</p>
<p class="p1"><span class="Apple-converted-space">      </span>new Notification("🌱 Serenes Reminder", { body:"You'll get daily notifications!" });</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>render();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>function startReminderLoop() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>setInterval(() =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>if (!state.notificationsEnabled) return;</p>
<p class="p1"><span class="Apple-converted-space">      </span>const [h,m] = state.reminderTime.split(':').map(Number);</p>
<p class="p1"><span class="Apple-converted-space">      </span>const now = new Date();</p>
<p class="p1"><span class="Apple-converted-space">      </span>const today = now.toISOString().slice(0,10);</p>
<p class="p1"><span class="Apple-converted-space">      </span>if (now.getHours()===h &amp;&amp; now.getMinutes()===m &amp;&amp; state.notifiedOn!==today) {</p>
<p class="p1"><span class="Apple-converted-space">        </span>new Notification("🌱 Serenes Reminder", { body:"Time to take your Serenes Fruits &amp; Veggies!" });</p>
<p class="p1"><span class="Apple-converted-space">        </span>state.notifiedOn = today; save();</p>
<p class="p1"><span class="Apple-converted-space">      </span>}</p>
<p class="p1"><span class="Apple-converted-space">    </span>}, 30000);</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>function init() {</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#checkinBtn').onclick = checkin;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#saveReminder').onclick = saveReminder;</p>
<p class="p1"><span class="Apple-converted-space">    </span>$('#toggleNotifications').onclick = () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>state.notificationsEnabled ? (state.notificationsEnabled=false, save()) : requestNotifications();</p>
<p class="p1"><span class="Apple-converted-space">      </span>render();</p>
<p class="p1"><span class="Apple-converted-space">    </span>};</p>
<p class="p1"><span class="Apple-converted-space">    </span>render(); startReminderLoop();</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>return {navigate:(id)=&gt;{}, init};</p>
<p class="p1">})();</p>
<p class="p1">window.addEventListener('DOMContentLoaded', Serenes.init);</p>
</body>
</html>
