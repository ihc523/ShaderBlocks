let instance;
let contextMenu;
let clientX = 0;
let clientY = 0;

let menus = [];
const about = {
	name: "关于",
	onClick: function (e) {
		console.log(e.target.textContent);
	},
};


/**
 * options:
 * {
 *  menus:[{
 *    name: string,
 *    onClick: Function
 *  }],
 * }
 */
const ContextMenu = function (options) {
	function createMenu() {
		const ul = document.createElement("ul");
		ul.classList.add("menu");
		const { menus } = options;
		if (menus && menus.length > 0) {
			for (let menu of menus) {
				const li = document.createElement("li");
				li.textContent = menu.name;
				li.onclick = menu.onClick;
				ul.appendChild(li);
			}
		}
		const body = document.querySelector("body");
		body.appendChild(ul);
		return ul;
	}

	return {
		getInstance: function () {
			if (!instance) {
				instance = createMenu();
			}
			return instance;
		},
	};
};

function showMenu(e) {
	e.preventDefault();
	
	clientX = e.clientX;
	clientY = e.clientY;

	const menus = contextMenu.getInstance();
	menus.style.top = `${e.clientY}px`;
	menus.style.left = `${e.clientX}px`;
	menus.classList.remove("hidden");
}

function hideMenu(event) {
	if(!instance){
		return;
	}

	const menus = contextMenu.getInstance();
	menus.classList.add("hidden");
}

export default {
	setup: function () {
		menus.push(about);
		contextMenu = ContextMenu({ menus })
		document.body.addEventListener("contextmenu", showMenu);
		document.body.addEventListener("click", hideMenu);
	},
	
	addItem: function (name, ClassObject) {
		menus.push({
			name, 
			onClick: (e)=>{
				let id = new Date().getTime();
				return new ClassObject(id, clientX, clientY);
			}
		})
	},
	showMenu: function (e) {
		if(!instance) return;
		showMenu(e);
	},
	hideMenu: function (e) {
		if(!instance) return;
		hideMenu(e);
	},
}
