export interface ModalProps {
  visible: boolean;
  isOverlay?: boolean;
  closeIcon?: boolean;
  isButton?: boolean;
  isOk?: boolean;
  isNo?: boolean;
  title?: string;
  type?: string;
  name?: string;
  content?: string;
  tips?: string;
  cance?: Function;
  success?: Function;
}

export const defaultState: ModalProps = {
  visible: false, // 显示隐藏
  isOverlay: true, // 遮罩
  closeIcon: true, // 关闭按钮
  isButton: false, // 按钮
  isOk: true, // 成功按钮
  isNo: true, // 取消按钮
  type: 'normal', // 标题
  title: '', // 类型 | normal | custom
  name: '', // 名字
  content: '', // 内容
  tips: '', // 内容
  cance: () => {}, // 取消回调
  success: () => {}, // 成功回调
};
