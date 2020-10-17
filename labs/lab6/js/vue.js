//book component
Vue.component("books", {
    props: ["book"], 
    template: "<div> {{ book.title }}  {{ book.author }} {{ book.cover }} </div>" 
})

let app = new Vue({
    el: "#app",

    data:
    {
        //will be used for v-if to hide second book
        display: true,

        //array of books 
        bookList: [
            {id: 0, title: "Wuthering Heights", author: "Emily Bronte", cover: "⛰️"},
            {id: 1, title: "The Book Thief", author: "Markus Zusak", cover: "🕵️"}
        ]

    }
})