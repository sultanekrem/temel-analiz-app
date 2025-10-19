<script>
  let hisseKodu = ''; // Arama kutusunun değerini tutacak değişken

  function hisseAra() {
    // Şimdilik sadece konsola yazdıracağız.
    // Bir sonraki adımda burada API'den veri çekeceğiz.
    if (hisseKodu) {
      console.log('Aranan Hisse Kodu:', hisseKodu.toUpperCase());
      alert(`'${hisseKodu.toUpperCase()}' için arama yapılıyor... (F12 ile konsolu kontrol et)`);
    } else {
      alert('Lütfen bir hisse senedi kodu girin.');
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
</style>