<template>
	<div class="header-info">
		<router-link to="/">
			<i class="fa left-icon row-item  fa-angle-left"></i>
		</router-link>
		<div class="header-title">消息中心</div>
		<div class="news-seach">
			<img src="../../../common/image/news-seach.png">
		</div>
	</div>
</template>

<script>
</script>

<style  scoped>
	.header-info {
		width: 750px;
		height: 50px;
		background: #429bfa;
	}
	.fa {
		display: inline-block;
		color: #fff;
	}
	.left-icon {
		font-size: .7rem;
		float: left;
	}
	.fa-angle-left {
		width: .4rem;
		height: .4rem;
		line-height: .4rem;
		padding: .25rem .2rem;
	}
	.header-title {
		width: 145px;
		height: 34px;
		line-height: 50px;
		color: #fff;
		font-size: 18px;
		padding-left: 150px;
		/*overflow: hidden;*/
	}
	.news-seach{
		width: 24px;
		height: 24px;
		float: right;
		display: block;
		color: #fff;
	}
</style>