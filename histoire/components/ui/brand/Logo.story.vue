<template>
  <Story title="UI/brand/Logo" icon="vscode-icons:file-type-vue" :layout="{ type: 'grid' }">
    <Variant title="Default" icon="vscode-icons:file-type-vue">
      <div class="p-3 rounded">
        <ULogo class="w-32" />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-32" />
        </textarea>
      </template>
    </Variant>

    <Variant title="Default dark" icon="vscode-icons:file-type-vue">
      <div class="bg-neutral-700 p-3 rounded">
        <ULogo class="w-32" dark />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-32" dark />
        </textarea>
      </template>
    </Variant>

    <Variant title="Iso" icon="vscode-icons:file-type-vue">
      <div class="p-3 rounded">
        <ULogo class="w-9" type="iso" />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-9" type="iso" />
        </textarea>
      </template>
    </Variant>

    <Variant title="Default dark" icon="vscode-icons:file-type-vue">
      <div class="bg-neutral-700 p-3 rounded">
        <ULogo class="w-9" type="iso" dark />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-9" type="iso" dark />
        </textarea>
      </template>
    </Variant>

    <Variant title="Hire" icon="vscode-icons:file-type-vue">
      <div class="p-3 rounded">
        <ULogo class="w-36" type="hire" />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-36" type="hire" />
        </textarea>
      </template>
    </Variant>

    <Variant title="Hire dark" icon="vscode-icons:file-type-vue">
      <div class="bg-neutral-700 p-3 rounded">
        <ULogo class="w-36" type="hire" dark />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-36" type="hire" dark />
        </textarea>
      </template>
    </Variant>

    <Variant title="Match" icon="vscode-icons:file-type-vue">
      <div class="p-3 rounded">
        <ULogo class="w-36" type="match" />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-36" type="match" />
        </textarea>
      </template>
    </Variant>

    <Variant title="Match dark" icon="vscode-icons:file-type-vue">
      <div class="bg-neutral-700 p-3 rounded">
        <ULogo class="w-36" type="match" dark />
      </div>

      <template #source>
        <textarea>
          <ULogo class="w-36" type="match" dark />
        </textarea>
      </template>
    </Variant>
  </Story>
</template>
