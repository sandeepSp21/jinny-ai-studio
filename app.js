const $=id=>document.getElementById(id);let currentScenes=[];
const templates=[
["Opening shot","Establish the location and introduce the main character."],
["Character action","Show the same character beginning the main activity."],
["Unexpected event","A surprising event interrupts the activity; show a clear reaction."],
["Emotional moment","Close-up of the character's worried or hopeful expression."],
["Prayer or decision","The character makes a heartfelt request, with respectful devotional imagery if relevant."],
["First sign of magic","A soft, beautiful glow appears in the distance; keep the scene peaceful."],
["Miracle in motion","Show the magical event clearly, with smooth movement and consistent objects."],
["Resolution","The lost object or problem returns to a safe, satisfying resolution."],
["Gratitude","The character expresses sincere thanks with a clear gesture and emotion."],
["Closing shot","End with a memorable wide shot and a short title or message."]
];
function makePrompts(){const base=$("prompt").value.trim();if(!base){$("status").textContent="Please enter a story description first.";return}
const n=Number($("scenes").value),style=$("style").value,ratio=$("ratio").value,duration=$("duration").value;
currentScenes=Array.from({length:n},(_,i)=>{const t=templates[i%templates.length];return {title:`Scene ${i+1}: ${t[0]}`,prompt:`${base}\n\nSCENE DIRECTION: ${t[1]}\nVISUAL STYLE: ${style}. Maintain the exact same character face, hairstyle, clothes, age, and key props in every scene. Keep the action simple and readable. Cinematic composition, natural motion, detailed background, consistent lighting.\nFORMAT: ${ratio}. CLIP LENGTH: ${duration}.`}});
render();$("status").textContent=`Created ${n} scene prompts. You can edit the story and create another set anytime.`}
function render(){const out=$("scenesOut");out.innerHTML="";currentScenes.forEach((s,i)=>{const el=document.createElement("article");el.className="scene";const h=document.createElement("h3");h.textContent=s.title;const p=document.createElement("p");p.textContent=s.prompt;const b=document.createElement("button");b.className="secondary";b.textContent="Copy this scene";b.onclick=()=>copy(s.prompt);el.append(h,p,b);out.append(el)})}
async function copy(t){try{await navigator.clipboard.writeText(t);$("status").textContent="Copied to clipboard."}catch{$("status").textContent="Clipboard not available. Select and copy the text manually."}}
$("makePlan").onclick=makePrompts;$("copyAll").onclick=()=>copy(currentScenes.map(s=>s.title+"\n"+s.prompt).join("\n\n---\n\n"));
$("saveProject").onclick=()=>{const data={prompt:$("prompt").value,style:$("style").value,ratio:$("ratio").value,duration:$("duration").value,scenes:$("scenes").value,currentScenes};localStorage.setItem("jinny-ai-studio-project",JSON.stringify(data));$("status").textContent="Project saved in this browser."};
$("downloadPrompts").onclick=()=>{const content=currentScenes.map(s=>s.title+"\n"+s.prompt).join("\n\n---\n\n");const blob=new Blob([content],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="jinny-ai-studio-prompts.txt";a.click();URL.revokeObjectURL(a.href)};
$("sendApi").onclick=async()=>{const endpoint=$("endpoint").value.trim();if(!endpoint){$("apiStatus").textContent="Add your own video API endpoint first. No provider is connected by default.";return}if(!currentScenes.length){$("apiStatus").textContent="Create scene prompts first.";return}try{$("apiStatus").textContent="Sending request…";const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json",...($("apiKey").value?{"Authorization":"Bearer "+$("apiKey").value}:{})},body:JSON.stringify({prompt:$("prompt").value,style:$("style").value,aspect_ratio:$("ratio").value,duration:$("duration").value,scenes:currentScenes})});const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||`Server returned ${res.status}`);$("apiStatus").textContent="Request accepted. Server response: "+JSON.stringify(data).slice(0,500)}catch(e){$("apiStatus").textContent="Could not generate: "+e.message+". Check that your endpoint supports POST and CORS."}};
const saved=localStorage.getItem("jinny-ai-studio-project");if(saved){try{const d=JSON.parse(saved);$("prompt").value=d.prompt||$("prompt").value;$("style").value=d.style||"3D Indian cartoon";$("ratio").value=d.ratio||"9:16";$("duration").value=d.duration||"5 seconds";$("scenes").value=d.scenes||"10";currentScenes=d.currentScenes||[];if(currentScenes.length)render()}catch{}}
if("serviceWorker" in navigator && location.protocol.startsWith("http"))navigator.serviceWorker.register("./sw.js").catch(()=>{});
