export default interface Presenter {
  initAndRenderView(args?: string[]): Promise<void>;
}
