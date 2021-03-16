export default interface Presenter {
  initAndRenderView(): Promise<void>;
}
