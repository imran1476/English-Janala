// console.log("hi,,,js")

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
 }
  words.forEach(word=>{
    
    const card=document.createElement("div");
    card.innerHTML=`
    <div class="bg-white py-10 px-8 text-center rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-5">${word.word?word.word :"শব্দ নাই"}</h2>
<p class="text-2xl ">Meaning /Pronounciation</p><br>
<div class="font-bangla text-3xl">"${word.meaning?word.meaning:"অর্থ নাই"}/${word.pronunciation? word.pronunciation :"উচ্চারণ নাই"}"</div>

<div class="flex justify-between items-center">

    <button onclick="my_modal_5.showModal()" class="btn bg-[#1a91ff1a]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn  bg-[#1a91ff1a]"><i class="fa-solid fa-volume-high"></i></button>
</div>

</div>
    `;
    wordContainer.append(card);
  })
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