'use strict'
var wDelta = 120;
// function scrollDoc(e) {
//     if (!e) e = event;
//     if (e.preventDefault) { e.preventDefault(); } else { e.returnValue = false; }
//     var __delta = e.wheelDelta || -e.detail;
//     __delta /= Math.abs(__delta);
//     document.documentElement.scrollLeft -= __delta * wDelta; // FF, Opera, IE
//     if (this.attachEvent) return false;
//     document.body.scrollLeft -= __delta * wDelta; // Chrome
// }
// window.onload = function() {
//     var html = document.documentElement;
//     if (html.attachEvent) {
//         html.attachEvent("onmousewheel", scrollDoc); // IE and Opera
//     } else {
//         html.addEventListener("DOMMouseScroll", scrollDoc, false); // FF
//         html.addEventListener("mousewheel", scrollDoc, false); // Chrome
//     }
// }

class HomeController {
    constructor($http,$timeout,$location,$state,$stateParams,dataService) {
        'ngInject';
        this.$state = $state;
        this.$http = $http;
        this.posts_arr = null;
        this.loading = false;
        this.$location = $location;
        this.$stateParams = $stateParams;
        this.dataService = dataService;
        this.getPosts();
    }
    getPosts(){
        this.$http.get('http://ec2-54-88-87-181.compute-1.amazonaws.com:8889/posts')
            .then(response => {
                this.posts_arr= response.data.reverse()
            })
            .catch(response => {
                console.log(response)
            })
     }
    showUrlPhoto(value){
        let arr = value.split('.')
        if(arr.length == 5){
            return value
        } else {
            return 'https://3ie87c2dond928rt2e2zzo8o-wpengine.netdna-ssl.com/wp-content/themes/gonzo/images/no-image-featured-image.png'
        }
    }


    to(id,street,photo){
        localStorage.setItem('id_post',id)
        localStorage.setItem('street_post',street)
        localStorage.setItem('photo_post',photo)
        // console.log(this.$state.href('posts-id',{id: value}))
        // console.log(this.$state)
        // console.log(this.$state.go('/posts/',{id: value},{reload: true}))
        // console.log(this.)
        console.log(this.$location.path('/posts/'+id))
    }
    modal(){
      return this.dataService.formmodal
    }
}

export default HomeController;

