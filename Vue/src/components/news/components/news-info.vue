<template>
	<scroll class="row-content" ref="scroll" :pullup='allLoaded' :data="record" @scrollToEnd="scrollTouchend">
	<div class="order-infos">
		<div class="order-items">
			<img class="submit" src="../../../common/image/news-submit.png">
			<p class="submit-tit">订单已提交</p>
			<p class="timer">今天12:00</p>
			<p class="detail">张三丰面馆/三丰—联网报警服务费分期【¥3600.00/12期】已初审提交，等待终审！</p>
			<p class="number">订单编号：JXAN-0101180426003</p>
		</div>
		<div class="order-items">
			<img class="submit" src="../../../common/image/news-reject.png">
			<p class="submit-tit">订单已驳回</p>
			<p class="timer">今天12:00</p>
			<p class="detail">张三丰面馆/三丰—联网报警服务费分期【¥3600.00/12期】已初审提交，等待终审！</p>
			<p class="number">订单编号：JXAN-0101180426003</p>
		</div>
		<div class="order-items">
			<img class="submit" src="../../../common/image/news-veto.png">
			<p class="submit-tit">订单已驳回</p>
			<p class="timer">今天12:00</p>
			<p class="detail">张三丰面馆/三丰—联网报警服务费分期【¥3600.00/12期】已初审提交，等待终审！</p>
			<p class="number">订单编号：JXAN-0101180426003</p>
		</div>
		<div class="order-items">
			<img class="submit" src="../../../common/image/news-pass.png">
			<p class="submit-tit">订单已驳回</p>
			<p class="timer">今天12:00</p>
			<p class="detail">张三丰面馆/三丰—联网报警服务费分期【¥3600.00/12期】已初审提交，等待终审！</p>
			<p class="number">订单编号：JXAN-0101180426003</p>
		</div>
		<div class="order-items">
			<img class="submit" src="../../../common/image/news-pass.png">
			<p class="submit-tit">订单已驳回</p>
			<p class="timer">今天12:00</p>
			<p class="detail">张三丰面馆/三丰—联网报警服务费分期【¥3600.00/12期】已初审提交，等待终审！</p>
			<p class="number">订单编号：JXAN-0101180426003</p>
		</div>
	</div>
	</scroll>
</template>

<script>
</script>

<style lang="less" scoped>
	.row-content {
	.order-infos {
		width: 100%;
	}
	.order-items {
		width: 6.9rem;
		height: 2.8rem;
		background: #fff;
		padding: 0 .3rem;
	}
	.submit {
		width: .51rem;
		height: .53rem;
		padding: 9px 0 0 15px; 
		display:block;
		float: left;
	}
	.submit-tit {
		padding: .24rem 0 0 .16rem;
		float: left;
		font-size: .28rem;
		color: #313233;
	}
	.timer {
		font-size: .26rem;
		color: #b1b2b3;
		padding: .24rem .30rem 0 5.36rem;
	}
	.detail {
		padding: .57rem .25rem 0 .32rem;
		font-size: .24rem;
		line-height: .27rem;
		color: #626364;
	}
	.number {
		font-size: .24rem;
		color: #979899;
		padding: .59rem 2.33rem .23rem .3rem;
	}
	 }
</style>