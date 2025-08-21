(function(){
  const pass = document.getElementById('adminPass');
  const login = document.getElementById('loginBtn');
  const card = document.getElementById('loginCard');
  const dash = document.getElementById('dashboard');

  function fmt(n){ return new Intl.NumberFormat().format(n); }

  function load(){
    const installs = parseInt(localStorage.getItem('serenes_metric_installs') || '1', 10);
    const dau = parseInt(localStorage.getItem('serenes_metric_dau_total') || '1', 10);
    const avgStreak = parseInt(localStorage.getItem('serenes_streak') || '0', 10);
    const notifs = parseInt(localStorage.getItem('serenes_notifs_today') || '0', 10);
    document.getElementById('installs').textContent = fmt(installs);
    document.getElementById('dau').textContent = fmt(dau);
    document.getElementById('avgStreak').textContent = fmt(avgStreak);
    document.getElementById('notifs').textContent = fmt(notifs);
  }

  login.addEventListener('click', () => {
    if (pass.value === 'serenes123') {
      card.style.display = 'none';
      dash.style.display = 'block';
      load();
    } else {
      alert('Incorrect password');
    }
  });
})();
