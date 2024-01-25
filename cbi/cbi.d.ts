// 添加 export {} 将声明文件标记为模块
export {};

declare module "cbijs" {
  // 声明 cbi_validators 全局变量
  const cbi_validators: { [key: string]: Function };

  // 声明 CBIEntry 接口
  interface CBIEntry {
    node: HTMLElement;
    id: string;
    parent: string;
    deps: string[];
    index: number;
  }

  // 声明 CBIStrings 接口
  interface CBIStrings {
    path: {
      browser: string;
      resource: string;
    };
    label: {
      choose: string;
      custom: string;
    };
  }

  // 声明 CBIChoices 接口
  interface CBIChoices {
    [key: string]: string;
  }

  // 声明全局函数 Int 和 Dec
  function Int(x: string): number;
  function Dec(x: string): number;

  // 声明 cbi_d_add 函数
  function cbi_d_add(
    field: string | HTMLElement,
    dep: string,
    index: number
  ): void;

  // 声明 cbi_d_checkvalue 函数
  function cbi_d_checkvalue(target: string, ref: string): boolean;

  // 声明 cbi_d_check 函数
  function cbi_d_check(deps: { [key: string]: string }[]): boolean;

  // 声明 cbi_d_update 函数
  function cbi_d_update(): void;

  // 继续声明其他函数...

  // 声明全局函数 cbi_validate_field
  function cbi_validate_field(
    cbid: string | HTMLElement,
    optional: boolean,
    type: string
  ): void;

  // 声明全局函数 cbi_row_swap
  function cbi_row_swap(elem: HTMLElement, up: boolean, store: string): boolean;

  // 声明全局函数 cbi_tag_last
  function cbi_tag_last(container: HTMLElement): void;

  // 继续声明其他接口和类型...

  // 扩展 String 类型的方法
  interface StringExtensions {
    serialize(...args: any[]): string;
    format(...args: any[]): string;
    nobr(): string;
  }

  namespace StringExtensions {
    function serialize(...args: any[]): string;
    function format(...args: any[]): string;
    function nobr(value: string): string;
  }

  // 使用 StringExtensions 替代 String
  const String: StringExtensions;

  // 声明模块中的全局
  global {
    const cbi_validators: typeof cbi_validators;
    const String: StringExtensions;
  }
}
