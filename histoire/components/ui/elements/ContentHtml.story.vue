<script setup>
</script>

<template>
  <Story
    title="elements/ContentHtml"
    icon="vscode-icons:file-type-vue"
    autoPropsDisabled
  >
    <UContentHtml class="text-sm">
      <h1>Título 1</h1>
      <h2>Título 2</h2>
      <h3>Título 3</h3>
      <h4>Título 4</h4>
      <h5>Título 5</h5>
      <h6>Título 6</h6>

      <br>

      <h2>Formatos de texto</h2>
      <p>lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dignissimos non nulla? Aliquid consequatur doloremque dolorum est inventore itaque minima necessitatibus nesciunt nostrum porro, praesentium quam qui quisquam reprehenderit vitae.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dignissimos non nulla? Aliquid consequatur doloremque dolorum est inventore itaque minima necessitatibus nesciunt nostrum porro, praesentium quam qui quisquam reprehenderit vitae.</p>
      <p>Puedes usar <strong>negrita</strong>, <em>cursiva</em>, <u>subrayado</u> y <s>tachado</s>.</p>

      <br>

      <h2>Listas</h2>
      <ul>
        <li>Elemento de lista no ordenada 1</li>
        <li>Elemento de lista no ordenada 2</li>
      </ul>
      <ol>
        <li>Elemento de lista ordenada 1</li>
        <li>Elemento de lista ordenada 2</li>
      </ol>

      <h2>Enlaces</h2>
      <p>Puedes crear <a href="https://quilljs.com/">enlaces a sitios web</a>.</p>

      <br>

      <h2>Imágenes</h2>
      <p>Insertar imágenes (ejemplo con imagen de placeholder):</p>
      <img src="https://placehold.co/600x400/EEE/31343C" alt="Imagen de ejemplo">

      <br>

      <h2>Citas</h2>
      <blockquote>Esta es una cita de ejemplo que puedes usar en Quill.js</blockquote>

      <br>

      <h2>Código</h2>
      <pre><code>function saludar() {
    console.log("¡Hola, mundo!");
}</code></pre>

      <br>

      <h2>Tablas</h2>
      <table>
        <thead>
        <tr>
          <th>Encabezado 1</th>
          <th>Encabezado 2</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Celda 1</td>
          <td>Celda 2</td>
        </tr>
        <tr>
          <td>Celda 3</td>
          <td>Celda 4</td>
        </tr>
        </tbody>
      </table>

      <br>

      <h2>Alineación de texto</h2>
      <p style="text-align: left;">Texto alineado a la izquierda</p>
      <p style="text-align: center;">Texto centrado</p>
      <p style="text-align: right;">Texto alineado a la derecha</p>

      <br>

      <h2>Colores y estilos</h2>
      <p><span style="color: red;">Texto en rojo</span></p>
      <p><span style="background-color: yellow;">Texto con fondo amarillo</span></p>

      <br>

      <h2>Tamaños de fuente</h2>
      <p><span style="font-size: 10px;">Texto pequeño</span></p>
      <p><span style="font-size: 18px;">Texto grande</span></p>
    </UContentHtml>
  </Story>
</template>
