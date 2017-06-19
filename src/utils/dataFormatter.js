export const toNum = value => Number.parseFloat(value)

export const toPercent = value => toNum(value) + '%'

export const toUsd = value => {
	return toNum(value).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: value >= 1 ? 2 : 8
	})
}

export const toUsdWholeNum = (value, digits = 0) => {
	return toNum(value).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		minimumFractionDigits: digits
	})
}

export const toBtc = (value, digits = 8) => {
	return '฿' + toNum(value).toLocaleString('en-US', {
		minimumFractionDigits: digits
	})
}