export const drawLine = ( p1x, p1y, p2x, p2y, invert, size, colorA, ctx, colorB = null ) => {

	const dx = p2x - p1x;
	const dy = p2y - p1y;
	const offset = Math.sqrt( ( dx * dx ) + ( dy * dy ) ) * ( invert ? - .3 : .3 );

	ctx.beginPath();

	ctx.moveTo( p1x, p1y );

	ctx.bezierCurveTo(
		p1x + offset, p1y,
		p2x - offset, p2y,
		p2x, p2y
	);

	if ( colorB !== null && colorA !== colorB ) {

		const gradient = ctx.createLinearGradient( p1x, p1y, p2x, p2y );
		gradient.addColorStop( 0, colorA );
		gradient.addColorStop( 1, colorB );

		ctx.strokeStyle = gradient;

	} else {

		ctx.strokeStyle = colorA;

	}

	ctx.lineWidth = size;
	ctx.stroke();

};

/**
 * 绘制背景网格线
 */
export function drawBgGrids( ctx, width, height, size = 32, showGrid = false , showGroup = true ,color = '#fff', lineWidth = 1 ,groupSize = 5) {
	// size 网格大小 groupSize 网格分组大小 这里是5 * 5 个网格为一组 group的颜色才使用color 其他的使用color2
	// 使用 generateSubduedColor 生成color2
	const color2 = generateSubduedColor(color, 0.5);
	ctx.save();
	if(showGrid) {
		ctx.beginPath();
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color2;
		// dash line
		ctx.setLineDash([5, 5]);
		for (let i = 0; i < width; i += size) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, height);
		}
		for (let i = 0; i < height; i += size) {
			ctx.moveTo(0, i);
			ctx.lineTo(width, i);
		}
		ctx.stroke();
	}
	
	if (showGroup) {
		ctx.beginPath();
		// solid line
		ctx.setLineDash([]);

		if (!showGrid && showGroup) {
			color = color2;
			// dash line
			ctx.setLineDash([5, 5]);
		}
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;

		for (let i = 0; i < width; i += size * groupSize) {
			ctx.moveTo(i, 0);
			ctx.lineTo(i, height);
		}
		for (let i = 0; i < height; i += size * groupSize) {
			ctx.moveTo(0, i);
			ctx.lineTo(width, i);
		}
		ctx.stroke();
	}

}

/**
 * 计算附属颜色
 * @param {*} mainColor 
 * @param {*} alphaMultiplier 
 * @returns 
 */
function generateSubduedColor(mainColor, alphaMultiplier = 0.5) {
    const parsedColor = parseColor(mainColor);

    if (!parsedColor) {
        console.error("Invalid color format");
        return null;
    }

    const [r, g, b, a] = parsedColor;
	// console.log(r, g, b, a);
	// 若 a = nan 或者 a = 0 则将alpha设置为1
	if (isNaN(a) || a === 0) {
		alphaMultiplier = 1;
	}
    // Adjust alpha value to create subdued color
    const subduedAlpha = Math.max(0, Math.min(a * alphaMultiplier, 255));

    return `rgba(${r}, ${g}, ${b}, ${subduedAlpha / 255})`;
}


/**
 * 解析颜色并返回RGBA数组
 * @param {*} color 
 * @returns - [r, g, b, a]
 */
export function parseColor(color) {
    // 检查是否是三位缩写的颜色
    const isShortHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(color);

    // 如果是缩写颜色，将其扩展为六位颜色
    const hexColor = isShortHex ? expandShortHex(color) : color;

    let rgbaArray;

    if (/^#([A-Fa-f0-9]{6})$/.test(hexColor)) {
        // 将六位颜色解析为RGBA数组
        rgbaArray = hexToRgba(hexColor);
    } else if (/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/.test(hexColor) || /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.test(hexColor)) {
        // 将rgba格式颜色解析为RGBA数组
        rgbaArray = extractRgbaValues(hexColor);
    } else{
        console.error("Invalid color format");
        return null;
    }

    return rgbaArray;

	// Helper function to convert hexadecimal color to RGBA array
	function hexToRgba(hex) {
		hex = hex.replace(/^#/, '');
		let bigint = parseInt(hex, 16);
		let r = (bigint >> 16) & 255;
		let g = (bigint >> 8) & 255;
		let b = bigint & 255;
		return [r, g, b, 255]; // Alpha is set to 255 (fully opaque)
	}

	// Helper function to extract RGBA values from rgba or rgb format
	function extractRgbaValues(rgbaString) {
		const rgbaRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/;
		// rgb
		const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;

		// 根据正则表达式提取颜色值
		const match = rgbaRegex.exec(rgbaString) || rgbRegex.exec(rgbaString);
		if (!match) {
			console.error("Invalid color format");
			return null;
		}

		const r = parseInt(match[1]);
		const g = parseInt(match[2]);
		const b = parseInt(match[3]);
		const a = match[4] ? parseFloat(match[4]) * 255 : 255;

		return [r, g, b, a];
	}

	// 辅助函数：将三位缩写的颜色扩展为六位颜色
	function expandShortHex(shortHex) {
		return `#${shortHex[1]}${shortHex[1]}${shortHex[2]}${shortHex[2]}${shortHex[3]}${shortHex[3]}`;
	}
}


