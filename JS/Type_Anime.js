
var query = `
query ($page: Int, $perPage: Int, $search: String) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
      currentPage
      lastPage
      hasNextPage
      perPage

      }
      media(search: $search, type: ANIME , sort: TRENDING_DESC) {
        id
        
        title {
          romaji
          english
          native
        }
        bannerImage
        coverImage  {
            extraLarge
        }
       characters {
          edges {
            id
            node {
              image {
                large
              }
            }
          }
        }
          
        studios(isMain: true) {
          nodes {
            name
          }
        }
         
        startDate {
            year
            month
            day
        }
        endDate{
            year
            month
            day 
        }
        format
        trending
        isAdult
        type
        genres
        episodes
        duration
        status
        popularity
        averageScore
        season
        siteUrl
        description
      }
    }
  }
`
  var variables = {
    id: 15125,
    page: 1,
    perPage: 10,
  }

  // Start Fetching the Api Data
let Anime = fetch(`https://graphql.anilist.co`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query: query,
    variables:variables,
    Media: {
      Type: 'Anime'
    }
  })
})

  Anime.then((DataReq) => DataReq.json())
  .then((VV) => {
    let DD = VV.data.Page.media

    // Here Maped the Data
    DD.map((items) => {
      let Poster_Anime = items.coverImage.extraLarge
      let Name_Anime = items.title.romaji
      let Year = items.startDate.year
      let status = items.status
      let season = items.season
      let avg = items.averageScore
      let gen = items.genres
      let des = items.description 

      // This remove the <Br> in card description
      $('.card__description').each(function() {
        $(this).html($(this).html().split('<br>')[0]);
      });

      // Here API Data make design
      let Pic_Container = ` 
      <div class="Holder card" data-aos="zoom-in">
      <div class="card__content">
      <p class="card__title">${Name_Anime}</p>
      <p class="card__description">${des}</p>
      <p class="card__Status extra1 ALL"><b>Status:</b> ${status} , ${season} ${Year}</p>
      <p class="card__Gen extra2 ALL"><b>Genre:</b> ${gen[1] || gen[0] || gen[2] || gen[3]}, ${gen[0]}, ${gen[2]} </p>
      <p class="card__Popularity extra3 ALL"><b>Popularity:</b> ${avg} &#128516 </p>

    </div>
    <div class="IMGholder" style="background-image: url(${Poster_Anime});">
    </div>

       <h2 class="Anime-Headline">${Name_Anime}</h2>
       <span class="Anime-GEN">${gen[0]}</span>
       <span class="Anime-GEN">${gen[1]}</span>
       <span class="Anime-GEN">${gen[2]}</span>

    </div>
    
       `

      // Added the Api Data to HTML
      document.getElementById("Row-1").innerHTML += Pic_Container

    })

  })