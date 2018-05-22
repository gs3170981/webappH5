<template>
  <slide-page>
    <news-header/>
    <news-business/>
    <news-info/>
    <system-info/>
  </slide-page>
</template>

<script>
  import SlidePage from 'base/slide-page/slide-page';
	import HeaderComponent from "./components/news-header";
	import BusinessComponent from "./components/news-business";
  import InfoComponent from "./components/news-info";
  import SystemComponent from "./components/system-info";
  
  export default {
    data () {
      return {
      }
    },
    components: {
			"slide-page": SlidePage,
      "news-header": HeaderComponent,
      "news-business": BusinessComponent,
      "news-info": InfoComponent,
      "system-info": SystemComponent
    },
    created () {

    }
  }
</script>

<style >
	
</style>