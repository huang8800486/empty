<template>
  <div class="base_components_list_layout">
    <div class="base_components_list" :class="{ one: isFlex }">
      <div class="title_list" v-if="titleList.length">
        <span v-for="(item, index) in titleList" :key="index"> {{ item }}</span>
      </div>
      <div class="list_item_wrap" v-if="currentLength > 0">
        <div class="list_item" :class="{ indent: isIndent }">
          <!-- {{ currentitemlist }} -->
          <div class="item" v-for="(item, index) in currentitemlist" :key="index">
            <template v-if="custom">
              <slot :item="item" :index="index"></slot>
            </template>
            <template v-else>
              <span v-for="(e, key, i) in item" :key="key" :class="highClass(i)">
                {{ e }}
              </span>
            </template>
          </div>
        </div>
        <BasePagation
          :total="currentLength"
          :current-page="page"
          :display="pageSize"
          :pagegroup="3"
          @callback="detailPagechange"
          v-if="currentLength > pageSize && isShowPage"
        />
      </div>
      <div class="list_item_noData" v-if="currentLength === 0">
        {{ $t('common.noData') }}
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  interface Props {
    titleList?: string[];
    isIndent?: boolean;
    isFlex?: boolean;
    custom?: boolean;
    listItem?: any[];
    highlight?: number[];
    currentIndex?: number;
    pageSize?: number;
    isShowPage?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    titleList: () => [],
    isIndent: true,
    isFlex: false,
    custom: false,
    isShowPage: false,
    listItem: () => [],
    highlight: () => [],
    currentIndex: 0,
    pageSize: 5,
  });
  const highClass = (idx: number | undefined) => {
    if (typeof idx === 'undefined') {
      return '';
    }
    if (idx >= 0) {
      return props.highlight.includes(idx) ? 'high' : '';
    }
    return '';
  };
  const page = ref(1);
  const pageSize = ref(props.pageSize);

  watchEffect(() => {
    if (props.currentIndex >= 0) {
      page.value = 1;
    }
  });
  const currentLength = computed(() => {
    return props.listItem.length;
  });
  const currentitemlist = computed(() => {
    if (currentLength.value <= pageSize.value) {
      return props.listItem;
    }
    return props.listItem.slice((page.value - 1) * pageSize.value, page.value * pageSize.value);
  });
  const detailPagechange = (num: number) => {
    page.value = num;
  };
</script>
