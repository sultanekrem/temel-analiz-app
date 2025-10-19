<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';

  // Sunucudaki load fonksiyonundan gelen verileri 'data' değişkeni ile yakalıyoruz.
  export let data;

  // $page.url.searchParams.get('hisse') ile mevcut URL'deki hisse kodunu alıyoruz.
  // Bu, sayfa yenilendiğinde input kutusunun dolu kalmasını sağlar.
  let hisseKodu = $page.url.searchParams.get('hisse') || '';

  // Arama fonksiyonu. Artık sadece URL'yi güncelliyoruz.
  function hisseAra() {
    if (hisseKodu) {
      // goto ile sayfayı yeniden yüklemeden URL'yi değiştiriyoruz.
      // SvelteKit bu URL değişikliğini algılayıp sunucudaki load fonksiyonunu tekrar çalıştırır.
      goto(`/?hisse=${hisseKodu.toUpperCase()}`);
    }
  }
</script>

<main>
  <h1>Temel Analiz Uygulaması</h1>
  
  <div class="arama-kutusu">
    <input 
      type="text" 
      bind:value={hisseKodu}
      placeholder="Hisse Kodu Girin (örn: THYAO)"
      on:keydown={(e) => e.key === 'Enter' && hisseAra()}
    />
    <button on:click={hisseAra}>
      Analiz Et
    </button>
  </div>

  <!-- Sonuçları gösterme alanı -->
  <div class="sonuc-alani">
    {#if data.sirketProfili}
      <!-- Veri geldiyse Şirket Profili Kartını göster -->
      <div class="kart">
  		<h2>{data.sirketProfili.name} ({data.sirketProfili.symbol})</h2>
  		<p class="sektor">Piyasa Değeri: {(data.sirketProfili.marketCap / 1000000000).toFixed(2)} Milyar USD</p>
  		<p>Güncel Fiyat: {data.sirketProfili.price} USD</p>
  <		p>Borsa: {data.sirketProfili.exchange}</p>
	  </div>
    {:else if data.error}
      <!-- Hata varsa Hata Mesajını göster -->
      <div class="kart hata">
        <p>{data.error}</p>
      </div>
    {:else if $page.url.searchParams.get('hisse')}
      <!-- Arama yapılmış ama henüz veri gelmemişse Yükleniyor... göster -->
      <div class="kart">
        <p>Yükleniyor...</p>
      </div>
    {/if}
  </div>

</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  h1 {
    color: #333;
    margin-bottom: 2rem;
  }

  .arama-kutusu {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 400px;
    margin-bottom: 2rem;
  }

  .arama-kutusu input {
    flex-grow: 1;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 1rem;
  }

  .arama-kutusu button {
    padding: 0.75rem 1.5rem;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .arama-kutusu button:hover {
    background-color: #0056b3;
  }

  .sonuc-alani {
    width: 100%;
    max-width: 800px;
  }

  .kart {
    background-color: #fff;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    margin-top: 1rem;
  }

  .kart h2 {
    margin-top: 0;
    color: #003366;
  }

  .kart .sektor {
    font-style: italic;
    color: #555;
    margin-bottom: 1rem;
  }
  
  .kart .aciklama {
    line-height: 1.6;
    color: #333;
  }

  .kart a {
    color: #007bff;
    text-decoration: none;
  }

  .kart a:hover {
    text-decoration: underline;
  }
  
  .kart.hata {
    background-color: #ffebee;
    color: #c62828;
    border: 1px solid #c62828;
  }
</style>