<template>
  <nav>
    <ul class="pagination">
      <li :class="{ disabled: current == 1 }">
        <a href="javascript:;" class="prev btn" @click="setCurrent(current - 1)"></a>
      </li>
      <!-- <li class="first" :class="{ disabled: current == 1 }">
        <a href="javascript:;" @click="setCurrent(1)"> {{ t('common.first') }} </a>
      </li> -->
      <li v-for="(p, i) in grouplist" :class="{ active: current == p.val }" :key="i">
        <a href="javascript:;" @click="setCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <!-- <li class="last" :class="{ disabled: current == page }">
        <a href="javascript:;" @click="setCurrent(page)"> {{ t('common.last') }} </a>
      </li> -->
      <li :class="{ disabled: current == page }">
        <a href="javascript:;" class="next btn" @click="setCurrent(current + 1)"></a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts" name="">
  import { useI18n } from '/@/hooks/web/useI18n';
  const { t } = useI18n();
  interface Props {
    total: number;
    display: number;
    currentPage: number;
    pagegroup: number;
  }
  const props = withDefaults(defineProps<Props>(), {
    total: 0,
    display: 10,
    currentPage: 1,
    pagegroup: 5,
  });
  const current = computed(() => {
    return props.currentPage;
  });
  const page = computed(() => {
    return Math.ceil(props.total / props.display);
  });
  const grouplist = computed(() => {
    let len = page.value;
    let temp = [];
    const list: any = [];
    const count = Math.floor(props.pagegroup / 2);
    let center = current.value;
    if (len <= props.pagegroup) {
      while (len--) {
        temp.push({ text: page.value - len, val: page.value - len });
      }
      return temp;
    }
    while (len--) {
      temp.push(page.value - len);
    }
    var idx = temp.indexOf(center);
    idx < count && (center = center + count - idx);
    current.value > page.value - count && (center = page.value - count);
    temp = temp.splice(center - count - 1, props.pagegroup);
    do {
      var t = temp.shift();
      list.push({
        text: t,
        val: t,
      });
    } while (temp.length);
    if (page.value > props.pagegroup) {
      current.value > count + 1 && list.unshift({ text: '...', val: list[0].val - 1 });
      current.value < page.value - count && list.push({ text: '...', val: list[list.length - 1].val + 1 });
    }
    return list;
  });
  const emit = defineEmits<{
    (e: string, idx: number): void;
  }>();
  const setCurrent = (num: any) => {
    let idx = parseFloat(num);
    if (current.value != idx && idx > 0 && idx < page.value + 1) {
      emit('callback', idx);
    }
  };
</script>
