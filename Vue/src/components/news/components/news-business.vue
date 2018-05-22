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
	export default {
		data() {
			return {
				show: true,
				isActive: true
			}
		}
		
	}
</script>

<style lang="less" scoped>
	.business-info {
		width: 7.5rem;
		height: 1.98rem;
		/*background: #2EE5A7;*/
	}
	.items {
		float: left;
	}
	.items-img {
		width: .92rem;
		height: .92rem;
		display: inline-block;
		padding: .28rem 0.97rem .18rem .52rem;
	}
	.items-tit {
		font-size: .28rem;
		padding: 0 .5rem;
		color: #626364;
	}
</style>