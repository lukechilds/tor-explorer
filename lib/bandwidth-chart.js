const chart = require('ascii-chart');

function pointsFromBandwidthData(values, numberPoints) {
	// Define vars
	const { length } = values;
	const points = [];
	let i = 0;
	let size;

	// Split values into n points
	if (numberPoints < 2) {
		points.push(values);
	} else {
		if (length % numberPoints === 0) {
			size = Math.floor(length / numberPoints);
			while (i < length) {
				points.push(values.slice(i, i += size));
			}
		}

		while (i < length) {
			size = Math.ceil((length - i) / numberPoints--);
			points.push(values.slice(i, i += size));
		}
	}

	// Return points
	return points

		// Calculate average value of each point
		// eslint-disable-next-line unicorn/no-reduce
		.map(point => Math.round(point.reduce((a, b) => a + b) / point.length))

		// Convert bytes to megabytes
		.map(bytes => Number((bytes / 1000000).toPrecision(3)));
}

module.exports = values => {
	if (!values || values.length === 0) {
		return '';
	}

	const points = pointsFromBandwidthData(values, 57);
	return chart(points, {
		width: 120,
		height: 20,
		padding: 0,
		pointChar: '*',
		negativePointChar: '.',
		axisChar: '.'
	});
};
