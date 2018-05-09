/**
 * 监听滑动和事件监听
 */
const {ccclass, property} = cc._decorator;

// 方向
const DIRECTOR = cc.Enum({
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
});

@ccclass
export default class TouchCtrl extends cc.Component {
    @property(cc.Vec2) startPos = null; // 点击初始位置
    @property(Number) defaultLen = 50; // 长度
    start () {

    }
    onEnable() {
        this.onListen();
    }
    onDisable() {
        this.offListen();
    }
    // 开启事件监听
    onListen() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    // 关闭事件监听
    offListen() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    touchStart(event) {
        // cc.error('touchStart');
        this.startPos = event.getLocation();
    }
    touchMove(event) {
        // cc.error('touchMove');
    }
    touchEnd(event) {
        // cc.error('touchEnd');
        const endPos = event.getLocation();
        const deltaX = endPos.x - this.startPos.x;
        const deltaY = endPos.y - this.startPos.y;
        this.checkDirector(event, deltaX, deltaY);
        this.startPos = null;
    }
    touchCancel(event) {
        // cc.error('touchCancel');
    }
    // 键盘按键
    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.KEY.w:
            case cc.KEY.up: this.goto(DIRECTOR.UP);
                break;
            case cc.KEY.s:
            case cc.KEY.down: this.goto(DIRECTOR.DOWN);
                break;
            case cc.KEY.a:
            case cc.KEY.left: this.goto(DIRECTOR.LEFT);
                break;
            case cc.KEY.d:
            case cc.KEY.right: this.goto(DIRECTOR.RIGHT);
                break;
            default:
                break;
        }
    }
    // 检测滑动方向
    checkDirector(event, deltaX, deltaY) {
        // 判断是否为滑动
        if (Math.abs(deltaX) < this.defaultLen && Math.abs(deltaY) < this.defaultLen) return;
        // 判断滑动方向
        if (Math.abs(deltaX) > Math.abs(deltaY)) { // 左右方向
            if (deltaX > 0) { // 右
                this.goto(DIRECTOR.RIGHT);
            } else { // 左
                this.goto(DIRECTOR.LEFT);
            }
        } else { // 上下方向
            if (deltaY > 0) { // 上
                this.goto(DIRECTOR.UP);
            } else { // 下
                this.goto(DIRECTOR.DOWN);
            }
        }
    }
    // 执行对应方向动作
    goto(director) {
        cc.info(DIRECTOR[director]);
    }
}