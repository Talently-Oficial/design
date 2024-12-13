const second = 1000
const minute = second * 60
const hour = minute * 60
const day = hour * 24

const formatResult = (value) => {
	return ('0' + value).slice(-2)
}

export default function (to) {
	const now = new Date().getTime()
	const countDown = new Date(to).getTime()
	const distance = countDown - now

	const days = Math.floor(distance / day)
	const hours = Math.floor((distance % day) / hour)
	const minutes = Math.floor((distance % hour) / minute)
	const seconds = Math.floor((distance % minute) / second)

	return {
		days: formatResult(days),
		hours: formatResult(hours),
		minutes: formatResult(minutes),
		seconds: formatResult(seconds),
	}
}
