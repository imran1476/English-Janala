// console.log("hi,,,js")
const createElements=(arr)=>{
  const HtmlElement=arr.map(el=>`<span class="btn">${el}</span>
  </span>`);
  return HtmlElement.join("");
}

// speak......

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById("loader").classList.remove("hidden");
     document.getElementById("lesson-container").classList.add("hidden");
    //document.getElementById("word-container").classList.add("hidden");

  }else{
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("lesson-container").classList.remove("hidden");
    //document.getElementById("word-container").classList.remove("hidden");

  }
}

const loadLessons=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")  
.then((response)=> response.json())
.then((json)=>{
    displayLessons(json.data);
})
}
const removeActive=()=>{
    const lessonButton=document.querySelectorAll(".lesson-btn");
    // console.log(lessonButton);
    lessonButton.forEach(btn=>btn.classList.remove("active"));
}

const loadLevelWord=(id)=>{
   manageSpinner(true);
    const url= `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
    .then(response=>response.json())
    .then(json=> {

        removeActive();
        const clickBtn=document.getElementById(`lesson-btn-${id}`);
     
        // console.log(clickBtn)
        clickBtn.classList.add("active");
        displayLevelWord(json.data)
    });

}
const loadWordDetail=async(id)=>{
    const url= `https://openapi.programming-hero.com/api/word/${id}`
    console.log(url)
   const res=await fetch(url);
   const details = await res.json();
   displayWordDetails(details.data);
}
/*{
"status": true,
"message": "successfully fetched a word details",
"data": {
"word": "Eager",
"meaning": "আগ্রহী",
"pronunciation": "ইগার",
"level": 1,
"sentence": "The kids were eager to open their gifts.",
"points": 1,
"partsOfSpeech": "adjective",
"synonyms": [
"enthusiastic",
"excited",
"keen"
],
"id": 5
}
}*/
const displayWordDetails=(word)=>{
    console.log(word)
    const detailBox=document.getElementById("detail-container");
    detailBox.innerHTML=`
        <div><h2 class="text-3xl font-bold">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2></div>
        <div><p class="text-xl font-semibold">Meaning</p>
        <p>${word.meaning}</p></div>
        <div><h5 class="text-xl font-semibold">Example</h5></div>
      <div>  <p>${word.sentence}</p></div>
        <div>
            <p class="text-xl font-semibold font-bangla mb-4">সমার্থক শব্দ গুলো</p>
          <div> ${createElements(word.synonyms)}</div>
        </div>
   
   </div>
   
    <div class="modal-action ">
      <form method="dialog" >
        <!-- if there is a button in form, it will close the modal -->
         <!-- <div> <button class="btn btn-primary">Primary</button></div> -->
        <div><button class="btn">Close</button></div>
      </form>`;

    document.getElementById("my_modal_5").showModal();


}

/*{
    "id": 57,
    "level": 3,
    "word": "Gracious",
    "meaning": "দয়ালু / সদয়",
    "pronunciation": "গ্রেসিয়াস"
}*/
const displayLevelWord=(words)=>{
   const wordContainer=document.getElementById("word-container");
 wordContainer.innerHTML="";
 if(words.length==0){
   wordContainer.innerHTML=`
   
 <div class="col-span-full text-center space-y-5 py-10 rounded-lg">
    <img src="images/alert-error.png" alt="" class="mx-auto"><p class=" text-sm text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
    <h2 class="text-4xl ">নেক্সট Lesson এ যান</h2>
 </div>
 `;
 manageSpinner(false);
 return;
 }
  words.forEach(word=>{
    
    const card=document.createElement("div");
    card.innerHTML=`
    <div class="bg-white py-10 px-8 text-center rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-5">${word.word?word.word :"শব্দ নাই"}</h2>
<p class="text-2xl ">Meaning /Pronounciation</p><br>
<div class="font-bangla text-3xl">"${word.meaning?word.meaning:"অর্থ নাই"}/${word.pronunciation? word.pronunciation :"উচ্চারণ নাই"}"</div>

<div class="flex justify-between items-center">

    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info"></i></button>
    <button onclick="pronounceWord('${word.word}')" class="btn  bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
</div>

</div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
}
const displayLessons=(lessons)=>{
   
// 1. get element.....
const lessonContainer=document.getElementById("lesson-container");
lessonContainer.innerHTML="";
// 2. get into every lessen........
lessons.forEach(lesson=>{
    console.log(lesson);
const btnDiv=document.createElement("div");
btnDiv.innerHTML=  `
  <button id="lesson-btn-${lesson.level_no
}" onclick="loadLevelWord(${lesson.level_no
})" class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no
}</button>
`;
lessonContainer.append(btnDiv);
});

}
loadLessons();
document.getElementById("btn-search").addEventListener("click",()=>{
  const input=document.getElementById("input-search");
  const searchValue=input.value.trim().toLowerCase();
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then((response)=>response.json())
  .then((json)=>{
    const allWords=json.data;
    console.log(allWords);
    const matchedWords=allWords.filter((word)=>word.word.toLowerCase().includes(searchValue));
    displayLevelWord(matchedWords);
  });
});