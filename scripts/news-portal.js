
let fetchData =[]

const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories').then((res) => res.json()).then((data) => showCategoris(data.data))
};
const showCategoris = data => {
    //  capture categois container
    const categorisContainer = document.getElementById('categories-container');
    data.news_category.forEach(singleCategory => {
        // console.log(singleCategory)

        categorisContainer.innerHTML += `
    <a class="nav-link" onclick="fetchCategoriesNews('${singleCategory.category_id}','${singleCategory.category_name}')" href="#">${singleCategory.category_name}</a>
    `
    });
}


// ?fetch all news avalablae

const fetchCategoriesNews = (category_id, category_name) => {
    // console.log(category_id)
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url).then((res) => res.json()).then((data) => {
        fetchData =data.data
        showAllNews(data.data, category_name)
    }
    )
}
// sowall news

const showAllNews = (data, category_name) => {


    document.getElementById('newsCount').innerText = data.length
    document.getElementById('CatagoryName').innerText = category_name
    const newsContainer = document.getElementById("all-news");
    newsContainer.innerHTML = ""
    data.forEach(singleNews => {

        const {_id,image_url,title,details,author,total_view,rating}= singleNews;

        newsContainer.innerHTML += `
        <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${details.slice(0, 200)}</p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
            
         <div class="d-flex gap-2">
          <img src= ${author.img} class=" img-fluid rounded-circle" alt="..." height="40" width="40" />
          <div>
            <p class="m-0 p-0">${author.name ? author.name : "Not Avalable"}</p>
            <p class="m-0 p-0">${author.published_date ? author.published_date : "Not Avalable"}</p>
          </div>
         </div>
         <div class="d-flex align-items-center">
         <i class="fas fa-eye"></i>
         <p class="m-0 p-0">${total_view ? total_view : "Not Avalable"}</p>
       </div>

       <div class="d-flex gap-2">
       ${genaratorStars(rating.number)}
       <p>${rating.number}</>
       </div>
       <div>
       <i class="fas fa-arrow-right" onclick="fetchNewsDetails('${_id}') " data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
       </div>

            </div>
          </div>
          <div>
          </div>
        </div>
        </div>
    `
    })
}

// show  news ditaisls

const fetchNewsDetails = news_id =>{
    let url=  `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url).then((res)=>res.json()).then(data=>showNewsDetail(data.data[0]))

}
const showNewsDetail =(newsDetail) =>{
    const {_id,image_url,title,details,author,total_view,others_info}= newsDetail;
    
       document.getElementById('modal-body').innerHTML= `
       <div class="card mb-3">
       <div class="row g-0">
         <div class="col-md-4">
           <img src="${image_url}" class="img-fluid rounded-start" alt="..." />
         </div>
         <div class="col-md-8 d-flex flex-column">
           <div class="card-body">
             <h5 class="card-title">${title}<span class="badge text-bg-warning">${others_info.is_trending ? "Trending":"Not Trending" }</span></h5>
             <p class="card-text">${details}</p>
           </div>
           <div class="card-footer border-0 bg-body d-flex justify-content-between">
           
        <div class="d-flex gap-2">
         <img src= ${author.img} class=" img-fluid rounded-circle" alt="..." height="40" width="40" />
         <div>
           <p class="m-0 p-0">${author.name}</p>
           <p class="m-0 p-0">${author.published_date}</p>
         </div>
        </div>
        <div class="d-flex align-items-center">
        <i class="fas fa-eye"></i>
        <p class="m-0 p-0">${total_view}</p>
      </div>

      <div>
      <i class="fas fa-star"></i>
   
      </div>
    

           </div>
         </div>
         <div>
         </div>
       </div>
       </div>
   `
}

const showTranding=()=>{
    let trandingNews = fetchData.filter(singeData => singeData.others_info.is_trending === true);
   const catagory_name = document.getElementById("CatagoryName").innerText
    showAllNews(trandingNews,catagory_name)
}

// ganarator star 

const genaratorStars =rating =>{
    let ratingHtmal = '';
    for (let index = 1; index <= Math.floor(rating); index++) {
        ratingHtmal += `<i class="fas fa-star"></i>`
        
    }
    if(rating- Math.floor(rating)>0){
        ratingHtmal += `<i class="fas fa-star-half"></i>`
    }
    return ratingHtmal
}