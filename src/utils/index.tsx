function debounce(fn: Function, delay: number) {
	let timer: number;
	return function () {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(fn, delay);
	};
}
export function throttle(fn: Function, delay: number) {
	let flag = true;
	return function (this: Function, ...args: Array<any>) {
		const context = this;
		if (flag) {
			flag = false;
			fn.apply(context, args);
			setTimeout(() => {
				flag = true;
			}, delay);
		}
	};
}

export function downRefresh(e: HTMLDivElement, callback: Function, refresh: HTMLDivElement) {
	let stratY: number; //鼠标按下的纵坐标
	let distance: number; //下拉距离
	const originTop = e.offsetTop + parseInt(document.documentElement.style.fontSize); //距离顶部距离
	const touchmove = throttle(_touchmove, 60);
	const refreshDistance = 30; //停止距离
	const dynamicDistance = 50; //图标动效+拉数据
	const iconSVG = refresh.children[0].children[0];
	e.addEventListener("touchstart", function (event: TouchEvent) {
		if (e.offsetTop === originTop && e.scrollTop === 0) {
			//元素在原本位置并且没有下翻
			stratY = event.touches[0].pageY;
			refresh.setAttribute("class", "home-refresh"); //防止加载时看见。也可一开始就设置这类名
			iconSVG.removeAttribute("class"); //初始化svg
			e.addEventListener("touchmove", touchmove);
			e.addEventListener("touchend", _touchend);
		}
	});
	function _touchmove(event: TouchEvent) {
		//下拉
		const pageY = event.touches[0].pageY;
		distance = pageY - stratY;
		refresh.children[1].innerHTML = "下拉刷新";
		if (distance > dynamicDistance) {
			iconSVG.setAttribute("class", "icon-rotate");
			refresh.children[1].innerHTML = "即将刷新";
		}
		if (distance > 0) {
			e.style.transform = `translateY(${distance}px)`;
			e.style.transitionDuration = "0.05s"; //节流过程加上动画不会卡顿
			if (distance <= refreshDistance) {
				refresh.style.transform = `translateY(${distance}px)`;
			} else {
				refresh.style.transform = `translateY(${refreshDistance}px)`;
			}
		} else {
			e.removeEventListener("touchmove", touchmove);
			e.removeEventListener("touchend", _touchend);
		}
	}
	function _touchend() {
		//回弹
		e.removeEventListener("touchmove", touchmove);
		e.removeEventListener("touchend", _touchend);
		const fontsize = (document.documentElement.clientWidth / 750) * 100;
		e.style.transform = `translateY(${originTop - fontsize}px)`; //配合主页设置的高度
		e.style.transitionDuration = "0.5s";
		e.style.transitionTimingFunction = "cubic-bezier(0.41, 1.1, 0.69, 1.28)";
		setTimeout(() => {
			e.style.transitionDuration = "0s";
		}, 500);
		if (distance > dynamicDistance) {
			refresh.style.transform = `translateY(${-refreshDistance}px)`;
			callback();
		} else if (distance <= dynamicDistance && distance > refreshDistance) {
			refresh.style.transform = `translateY(${-refreshDistance}px)`;
		} else {
			refresh.style.transform = `translateY(${-distance}px)`;
		}
	}
}

export function loadMore(e: HTMLDivElement, callback: Function) {
	function _loadMore() {
		const containerHeight = e.clientHeight;
		const scrollTop = e.scrollTop;
		const scrollHeight = e.scrollHeight;
		if (containerHeight + scrollTop + 1 >= scrollHeight) {
			callback();
		}
	}
	e.addEventListener("scroll", debounce(_loadMore, 1000));
}

export function getBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

export function randomColor() {
	const r =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	const g =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	const b =
		Math.floor(Math.random() * 256).toString(16).length < 2
			? "0" + Math.floor(Math.random() * 256).toString(16)
			: Math.floor(Math.random() * 256).toString(16);
	return "#" + r + g + b;
}
