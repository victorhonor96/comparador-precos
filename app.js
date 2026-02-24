import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://zuupkhhvcrjzwkgwwtgz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1dXBraGh2Y3JqendrZ3d3dGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDg3MTcsImV4cCI6MjA4NzUyNDcxN30.KJiStEORy4v9egIiPsbK5qy_KS4GPwYSypFEZ3494zw'
const supabase = createClient(supabaseUrl, supabaseKey)

window.adicionarPreco = async function () {
  const produto = document.getElementById('produto').value
  const mercado = document.getElementById('mercado').value
  const preco = parseFloat(document.getElementById('preco').value)

  const { error } = await supabase
    .from('precos')
    .insert([{ produto, mercado, preco }])

  if (error) {
    alert("Erro ao salvar")
    console.log(error)
  } else {
    alert("Preço salvo!")
  }
}

window.buscarPreco = async function () {
  const nome = document.getElementById('buscarProduto').value

  const { data, error } = await supabase
    .from('precos')
    .select('*')
    .ilike('produto', `%${nome}%`)
    .order('preco', { ascending: true })

  const lista = document.getElementById('resultado')
  lista.innerHTML = ""

  if (error) {
    console.log(error)
    return
  }

  data.forEach(item => {
    const li = document.createElement('li')
    li.textContent = `${item.mercado} - R$ ${item.preco}`
    lista.appendChild(li)
  })
}
