<script lang="ts">
  // Behavior
  window.oncontextmenu = (event) => {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  // Register service worker to control making site work offline
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
  }
  // Func
  const getTime = () => {
    const d = new Date()
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`
  }
  // Timer
  let time = getTime()
  setInterval(() => time = getTime(), 1000)
  // Name
  let name = localStorage.name || ''
  const handleUpdateName = () => {
    const newName = prompt("输入姓")
    if (newName) {
      localStorage.name = newName.slice(0, 1)
      name = newName
    }
  }
</script>

<main>
  <img class="bg" src="assets/frame.png" alt="">
  <div class="time">{time}</div>
  <div class="name">{name}{name && '*'}</div>
  <div class="updateName" on:click={handleUpdateName}></div>
</main>

<style>
	main {
    position: relative;
		text-align: center;
    user-select: none;
	}

  .bg {
    width: 100%;
  }

  .time {
    color: white;
    font-size: 6.7vw;
    position: absolute;
    left: 28.5vw;
    top: 19.5vw;
  }

  .name {
    color: #333;
    font-size: 4vw;
    position: absolute;
    left: 33vw;
    top: 40.5vw;
  }
  .updateName {
    background: transparent;
    width: 100%;
    height: 100px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
</style>
