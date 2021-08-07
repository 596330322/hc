<script lang="ts">
  // Env
  // Behavior
  window.oncontextmenu = (event) => {
    event.preventDefault()
    event.stopPropagation()
    return false
  }
  // Register service worker to control making site work offline
  if ('serviceWorker' in navigator) {
    // navigator.serviceWorker.register('sw.js')
  }

  // Type
  const EnumType = {
    healthy: {
      id: 'healthy',
      headerColor: '#5790EC',
      themeColor: '#5790EC',
      time: () => {
        const d = new Date()
        return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`
      },
    },
    trip: {
      id: 'trip',
      headerColor: '#f6f6f6',
      themeColor: '#51a26c',
      time: () => {
        const d = new Date()
        return `更新于：${d.getFullYear()}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}:${d.getSeconds().toString().padStart(2,'0')}`
      }
    },
  }
  let type // healthy | trip
  const handleToggleType = (id) => {
    // Update type
    if ([EnumType.healthy.id, EnumType.trip.id].includes(id)) {
      // Toggle to trip
      localStorage.type = id
      type = id
    } else if (type === EnumType.healthy.id) {
      // Toggle to trip
      localStorage.type = EnumType.trip.id
      type = EnumType.trip.id
    } else {
      // Toggle to healthy
      localStorage.type = EnumType.healthy.id
      type = EnumType.healthy.id
    }
    // Update theme
    const item = Object.values(EnumType).find(i => i.id === type)
    const theme = document.querySelector("[name='theme-color']")
    if (theme && item) {
      theme.content = item.headerColor
      document.body.style.backgroundColor = item.themeColor
    }
    // Update timer
    time = EnumType[type].time()
  }

  // Timer
  let time = ''

  // Name
  let name = localStorage.name || ''
  const handleUpdateName = () => {
    const input = prompt("输入姓")
    if (input) {
      const processedInput = `${input.slice(0, 1)}*`
      localStorage.name = processedInput
      name = processedInput
    }
  }

  // Phone
  let phone = localStorage.phone || ''
  const handleUpdatePhone = () => {
    const input = prompt("输入手机")
    if (input) {
      const processInput = `${input.slice(0, 3)}****${input.slice(-4)}的动态行程卡`
      localStorage.phone = processInput
      phone = processInput
    }
  }

  // City
  let city = localStorage.city || ''
  const handleUpdateCity = () => {
    const input = prompt("输入省市")
    if (input) {
      const processInput = `${input}`
      localStorage.city = processInput
      city = processInput
    }
  }

  // Type
  const handleUpdateHealthy = () => {
    handleUpdateName()
  }
  const handleUpdateTrip = () => {
    handleUpdatePhone()
    handleUpdateCity()
  }

  // Init
  handleToggleType(localStorage.type || EnumType.healthy.id)
  setInterval(() => time = EnumType[type].time(), 1000)
</script>

<main>
  {#if type === EnumType.healthy.id}
    <div class="healthy-wrapper">
      <img class="healthy-bg" src="assets/healthy/bg.png" alt="">
      <div class="healthy-time">{time}</div>
      <div class="healthy-name">{name}</div>
      <div class="healthy-to-trip-portal" on:click={() => handleToggleType(EnumType.trip.id)}></div>
      <div class="input-prompt" on:click={handleUpdateHealthy}></div>
    </div>
  {/if}

  {#if type === EnumType.trip.id}
    <div class="trip-wrapper">
      <div class="back-button" on:click={() => handleToggleType(EnumType.healthy.id)}></div>
      <img class="trip-bg" src="assets/trip/bg.png" alt="">
      <img class="trip-arrow" src="assets/trip/arrow.png" alt="">
      <div class="trip-phone">{phone}</div>
      <div class="trip-time">{time}</div>
      <div class="trip-city">
        <span class="trip-city-prefix">您于前14天内到达或途径：</span>
        <span class="trip-city-location">{city}</span>
      </div>
      <div class="input-prompt" on:click={handleUpdateTrip}></div>
    </div>
  {/if}

  <div class="toggle-button" on:click={handleToggleType}></div>
</main>

<style>
  /* Base */
	main {
    position: relative;
		text-align: center;
    user-select: none;
	}

  /* Common */
  .back-button {
    position: absolute;
    top: 0;
    left: 0;
    width: 11.9vw;
    height: 11.9vw;
  }
  .toggle-button {
    position: absolute;
    top: 1.8vw;
    right: 2vw;
    width: 23.2vw;
    height: 8.5vw;
  }
  .input-prompt {
    position: absolute;
    left: 50%;
    top: 0;
    width: 40vw;
    height: 11.9vw;
    transform: translateX(-50%);
  }

  /* Healthy */
  .healthy-wrapper {
    background-color: #5790EC;
  }
  .healthy-bg {
    display: block;
    width: 100%;
  }
  .healthy-time {
    position: absolute;
    left: 28.5vw;
    top: 19.9vw;
    color: white;
    font-size: 6.7vw;
  }
  .healthy-name {
    position: absolute;
    left: 32vw;
    top: 41.9vw;
    color: #333;
    font-size: 4vw;
  }
  .healthy-to-trip-portal {
    position: absolute;
    right: 5.5vw;
    top: 181.9vw;
    width: 21vw;
    height: 20vw;
  }

  /* Trip */
  .trip-wrapper {
    background-color: #51a26c;
  }
  .trip-bg {
    display: block;
    width: 100%;
  }
  .trip-arrow {
    position: absolute;
    left: 50%;
    top: 76vw;
    width: 37.4vw;
    transform: translate(-50%) scale(1);
    animation: 0.7s linear infinite alternate-reverse trip-arrow-anim;
  }
  @keyframes trip-arrow-anim {
    from {
      transform: translate(-50%) scale(1);
    }
    to {
      transform: translate(-50%) scale(1.2);
    }
  }
  .trip-phone {
    position: absolute;
    left: 0;
    right: 0;
    top: 54vw;
    color: #333;
    font-size: 4.4vw;
  }
  .trip-time {
    position: absolute;
    top: 63.8vw;
    left: 24.9vw;
    color: #999;
    font-size: 3.8vw;
  }
  .trip-city {
    position: absolute;
    left: 11.6vw;
    top: 126.7vw;
    font-size: 3.7vw;
  }
  .trip-city-prefix {
    color: #999;
  }
  .trip-city-location {
    color: #333;
  }
</style>
