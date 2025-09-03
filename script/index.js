// console.log("hi,,,js")

const loadLessons=()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")  
.then((response)=> response.json())
.then((json)=>{
    displayLessons(json.data);
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
  <button class="btn btn-outline btn-primary" ><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no
}</button>
`;
lessonContainer.append(btnDiv);
});

}
loadLessons();