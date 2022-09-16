declare module '*.vue' {
    export type Component<Props = any> =
      | { new (): ComponentPublicInstance<Props> }
      | FunctionalComponent<Props>;
  }