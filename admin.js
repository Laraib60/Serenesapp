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
  </style>
</head>
<body>
<p class="p1">document.getElementById('loginBtn').onclick = () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>if (document.getElementById('adminPass').value === 'serenes123') {</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('login').style.display='none';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('dashboard').style.display='block';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('installs').textContent = localStorage.getItem('serenes_metric_installs')||'1';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('dau').textContent = localStorage.getItem('serenes_metric_dau')||'1';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('avgStreak').textContent = localStorage.getItem('serenes_streak')||'0';</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.getElementById('notifs').textContent = localStorage.getItem('serenes_notifs')||'0';</p>
<p class="p1"><span class="Apple-converted-space">  </span>} else alert('Wrong password');</p>
<p class="p1">};</p>
</body>
</html>
