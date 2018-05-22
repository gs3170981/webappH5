<template>
	<div class="business-info">
		<ul  class="business-item">
			<li class="items">
				<img class="items-img" src="../../../common/image/news-business.png">
				<p class="items-tit">业务消息</p>
			</li>
			<li class="items">
				<img class="items-img" src="../../../common/image/news-system.png">
				<p class="items-tit">系统通知</p>
			</li>
			<li class="items">
				<img class="items-img" src="../../../common/image/news-pc.png">
				<p class="items-tit">平台活动</p>
			</li>
		</ul>
	</div>
</template>

<script>
</script>

<style scoped>
	.business-info {
		width: 100%;
		height: 113px;
		/*background: #2EE5A7;*/
	}
	.items {
		float: left;
	}
	.items-img {
		width: 46px;
		height: 46px;
		display: inline-block;
		padding: 14px 30px;
	}
	.items-tit {
		font-size: 14px;
		padding: 9px 30px;
		color: #626364;
	}
</style>