const msgs = document.getElementById('messages');
const timeEl = document.getElementById('msg-time');

function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html) e.innerHTML = html;
  return e;
}

function show(elem, delay){
  return new Promise(r => setTimeout(()=>{
    elem.classList.add('show');
    r();
  }, delay));
}

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }

async function runDemo(){
  msgs.innerHTML = '';
  timeEl.textContent = '';

  timeEl.innerHTML = '<span class="msg-time-day">Today</span> ' +
    new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});

  await sleep(800);

  // 1. Voice bubble (outgoing)
  const voiceOut = el('div','msg-out',`
    <div class="voice-bubble">
      <div class="voice-mic-sm">
        <svg width="8" height="8" viewBox="0 0 24 24">
          <rect x="9" y="2" width="6" height="12" rx="3"/>
          <path d="M5 10a7 7 0 0014 0"/>
          <line x1="12" y1="19" x2="12" y2="22"/>
        </svg>
      </div>
      <div class="voice-wf">
        <div class="vb"></div><div class="vb"></div><div class="vb"></div>
        <div class="vb"></div><div class="vb"></div><div class="vb"></div>
        <div class="vb"></div><div class="vb"></div><div class="vb"></div>
        <div class="vb"></div>
      </div>
      <span class="voice-dur">0:08</span>
    </div>
  `);
  msgs.appendChild(voiceOut);
  await show(voiceOut, 100);
  await sleep(900);

  // 2. Transcript (what was said)
  const transcript = el('div','msg-transcript',
    '"Hey Pool, log 3 hours on my CDBG grant for Tuesday"');
  msgs.appendChild(transcript);
  await show(transcript, 100);
  await sleep(1000);

  // 3. Typing indicator
  const typing = el('div','typing',
    '<span></span><span></span><span></span>');
  msgs.appendChild(typing);
  await show(typing, 100);
  await sleep(1400);

  // 4. Pool reply
  typing.classList.remove('show');
  await sleep(200);
  typing.remove();

  const reply = el('div','msg-in',`
    <div class="in-bubble">Done — logged 3 hrs to CDBG-CV Housing for Tuesday. Coded to PP03 ✓</div>
  `);
  msgs.appendChild(reply);
  await show(reply, 100);

  // replay after pause
  await sleep(5000);
  runDemo();
}

runDemo();

// form
const form = document.getElementById('wl-form');
const succ = document.getElementById('form-success');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('.form-btn');
  btn.textContent = '…'; btn.style.opacity = '0.6';
  const real = !this.action.includes('YOUR_FORM_ID');
  const done = () => { this.style.display='none'; succ.style.display='block'; };
  real
    ? fetch(this.action,{method:'POST',body:new FormData(this),headers:{Accept:'application/json'}})
        .then(r=>r.ok?done():(btn.textContent='Error',btn.style.opacity='1'))
        .catch(()=>{btn.textContent='Error';btn.style.opacity='1'})
    : setTimeout(done, 400);
});
