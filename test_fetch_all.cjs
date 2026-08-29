async function run() {
  const urls = ['getSiswa', 'getGuru', 'getKepala', 'getMadrasah'];
  for (const u of urls) {
    const res = await fetch('https://script.google.com/macros/s/AKfycbzpi53rjdBSr75n-7g0K1guJqjGlJijCFjo217XE44e6NQlZ4EMhyw8nq2whDEo1CtpJg/exec?action=' + u);
    const data = await res.json();
    console.log(u, data.values?.map(r => r[0]));
  }
}
run();
