<template>
	<div id="screen-loader">
		<div>
			<div class="loading-logo">
        <ULogo type="iso" />
			</div>

			<div class="loading">
        <div class="circle-loader"></div>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped>
#screen-loader {
	width: 100vw;
	height: 100vh;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5000;
}

.loading-logo {
	width: 64px;
	height: auto;
	margin-bottom: 45px;
}

.loading-logo img {
	display: block;
	margin: auto;
}

.circle-loader {
  margin: auto;
  width: 38px;
  height: 38px;
  border-width: 3px;
  border-radius: 50%;
  border-style: solid;
  border-color: #e2e8f0;
  border-bottom-color: #2a1e4f;
  animation: rotate-circle 0.4s linear infinite;
}

@keyframes rotate-circle {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(1turn);
  }
}
</style>
