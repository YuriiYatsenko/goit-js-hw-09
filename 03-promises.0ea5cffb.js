function e(e,t){return new Promise(((o,l)=>{setTimeout((()=>{Math.random()>.3?o({position:e,delay:t}):l({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(t=>{t.preventDefault();const o=parseInt(t.target.elements.delay.value),l=parseInt(t.target.elements.step.value),n=parseInt(t.target.elements.amount.value),s=[];for(let t=1;t<=n;t++){const n=e(t,o+(t-1)*l).then((({position:e,delay:t})=>{console.log(`✅ Fulfilled promise ${e} in ${t}ms`)})).catch((({position:e,delay:t})=>{console.log(`❌ Rejected promise ${e} in ${t}ms`)}));s.push(n)}Promise.all(s).then((()=>{console.log("All promises fulfilled")})).catch((()=>{console.log("At least one promise rejected")}))}));
//# sourceMappingURL=03-promises.0ea5cffb.js.map