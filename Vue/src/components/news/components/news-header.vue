<template>
	<div class="header-info">
		<router-link to="/">
			<i class="fa left-icon row-item  fa-angle-left"></i>
		</router-link>
		<div class="header-title">消息中心</div>
		<!--放大镜-->
			<!--<img class="news-seach" src="../../../common/image/news-seach.png">-->
	</div>
</template>

<script>
</script>

<style lang="less" scoped>
	.header-info {
		width: 7.5rem;
		height: .93rem;
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
		width: 1.45rem;
		height: .34rem;
		line-height: .5rem;
		color: #fff;
		font-size: .36rem;
		padding-top: .32rem;
		padding-left: 2.73rem;
	}
	/*搜索*/
	.news-seach{
		width: .4rem;
		height: .4rem;
		padding-left: 6.54rem;
		float: right;
		display: block;
		color: #fff;
	}
</style>