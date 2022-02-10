declare namespace app {

    namespace ui {

        function block(elm?: any): void;

        function unblock(elm?: any): void;

        function setBusy(elm?: any, optionsOrPromise?: any): void;

        function clearBusy(elm?: any): void;

    }
}