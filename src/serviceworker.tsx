import { message } from "antd";

export function installApp() {
	let appPromptEvent: any = null;
	const installBtn = document.querySelector(".home-logo > .homelogo");
	window.addEventListener("beforeinstallprompt", (event: Event) => {
		appPromptEvent = event;
	});
	if (installBtn) {
		installBtn.addEventListener("click", () => {
			if (appPromptEvent !== null) {
				appPromptEvent.prompt();
				appPromptEvent.userChoice.then((result: any) => {
					if (result.outcome === "accepted") {
						message.success("已安装至桌面");
					} else {
						console.log("拒绝安装");
					}
					appPromptEvent = null;
				});
			}
		});
	}
}
export function noNetWork() {
	if (Notification.permission === "default") {
		Notification.requestPermission();
	}
	window.addEventListener("online", () => {
		new Notification("提示", { body: "已连接网络" });
	});
	window.addEventListener("offline", () => {
		new Notification("提示", { body: "暂时无网络连接" });
	});
}
export function userInstalled() {
	window.addEventListener("appinstalled", function () {
		console.log("用户已安装");
	});
}
export function ReceiveWorker() {
	if ("BroadcastChannel" in window) {
		const workboxChannel = new BroadcastChannel("workbox");
		workboxChannel.addEventListener("message", (event) => {
			if (event.data) {
				console.log("请求重新处理");
			} else {
				console.log("请求失败");
			}
		});
	} else {
		if (navigator.serviceWorker) {
			navigator.serviceWorker.addEventListener("message", (event) => {
				if (event.data) {
					console.log("请求重新处理");
				} else {
					console.log("请求失败");
				}
			});
		}
	}
}
export function registerServiceWorker() {
	if ("serviceWorker" in navigator) {
		window.addEventListener("load", () => {
			navigator.serviceWorker.register("./sw.js");
		});
	}
}
