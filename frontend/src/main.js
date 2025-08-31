const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';
const app = document.getElementById('app');
app.innerHTML = `<h1>Smart Helpdesk (MVP)</h1>
<section style="display:flex;gap:1rem;flex-wrap:wrap">
<div><h3>Register</h3><input id="r_name" placeholder="name"/><br/><input id="r_email" placeholder="email"/><br/><input id="r_pass" type="password" placeholder="password"/><br/><button id="btn_register">Register</button></div>
<div><h3>Login</h3><input id="l_email" placeholder="email"/><br/><input id="l_pass" type="password" placeholder="password"/><br/><button id="btn_login">Login</button></div>
</section><hr/>
<section><h3>Create Ticket</h3><input id="t_title" placeholder="title" style="width:300px"/><br/><textarea id="t_body" rows="4" cols="50" placeholder="describe your issue"></textarea><br/><button id="btn_ticket">Create Ticket</button></section>
<hr/><section><h3>My Tickets</h3><button id="btn_load">Load</button><div id="tickets"></div></section>`;
let token=null;
document.getElementById('btn_register').onclick=async()=>{const name=r_name.value,email=r_email.value,password=r_pass.value;const res=await fetch(API+'/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password})});alert('Registered: '+JSON.stringify(await res.json()));};
document.getElementById('btn_login').onclick=async()=>{const email=l_email.value,password=l_pass.value;const res=await fetch(API+'/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email,password})});const data=await res.json();token=data.token;alert('Logged in as '+data.email);};
document.getElementById('btn_ticket').onclick=async()=>{if(!token){alert('Login first');return;}const title=t_title.value,body=t_body.value;const res=await fetch(API+'/tickets',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({title,body})});const data=await res.json();alert('Ticket created: '+data._id)};
document.getElementById('btn_load').onclick=async()=>{if(!token){alert('Login first');return;}const res=await fetch(API+'/tickets',{headers:{'Authorization':'Bearer '+token}});const list=await res.json();tickets.innerHTML=list.map(t=>`<div style="border:1px solid #ccc;padding:8px;margin:6px 0;"><b>${t.title}</b> — <i>${t.status}</i><br/>${t.body}<br/><small>Reply: ${t.agentReply||'(none)'}</small></div>`).join('');};