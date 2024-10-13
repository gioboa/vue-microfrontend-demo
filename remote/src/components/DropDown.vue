<script setup lang="ts">
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
} from "radix-vue";

const handleClick = () => {
  console.log("New Tab clicked");
};
</script>

<template>
  <DropdownMenuRoot>
    <DropdownMenuTrigger>
      <button class="btn btn-primary">Open Dropdown</button>
    </DropdownMenuTrigger>
    <DropdownMenuPortal>
      <DropdownMenuContent :side-offset="5" style="background-color: white">
        <DropdownMenuItem value="New Tab" @click="handleClick">
          New Tab
        </DropdownMenuItem>
        <DropdownMenuItem value="Another Tab" @click="handleClick">
          Another Tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPortal>
  </DropdownMenuRoot>
</template>
