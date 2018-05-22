<template>
  <slide-page>
    <news-header/>
    <news-business/>
    <news-info/>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page';
	import HeaderComponent from "./components/news-header";
	import BusinessComponent from "./components/news-business";
  import InfoComponent from "./components/news-info";
  
  export default {
    data () {
      return {
      }
    },
    components: {
//    SlidePage
			"slide-page": SlidePage,
      "news-header": HeaderComponent,
      "news-business": BusinessComponent,
      "news-info": InfoComponent
    },
    created () {

    }
  }
</script>

<style >
	
</style>