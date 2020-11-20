import { HeaderedItemConfig, ItemConfig, RootItemConfig, RowOrColumnOrStackParentItemConfig, StackItemConfig } from '../config/config';
import { UserComponentItemConfig, UserItemConfig, UserRowOrColumnItemConfig, UserStackItemConfig } from '../config/user-config';
import { AssertError, UnexpectedNullError } from '../errors/internal-error';
import { LayoutManager } from '../layout-manager';
import { AreaLinkedRect } from '../utils/types';
import { createTemplateHtmlElement, getElementWidthAndHeight, setElementHeight, setElementWidth } from '../utils/utils';
import { ComponentItem } from './component-item';
import { ContentItem } from './content-item';
import { RowOrColumn } from './row-or-column';

/** @public */
export class Root extends ContentItem {
    /** @internal */
    private readonly _childElementContainer;
    /** @internal */
    private readonly _containerElement: HTMLElement;

    /** @internal */
    constructor(layoutManager: LayoutManager, config: RootItemConfig, containerElement: HTMLElement) {
      
        super(layoutManager, config, null, createTemplateHtmlElement(Root.templateHtml));

        this.isRoot = true;
        this._childElementContainer = this.element;
        this._containerElement = containerElement;
        this._containerElement.appendChild(this.element);
    }

    /** @internal */
    init(): void {
        if (this.isInitialised === true) return;

        this.updateNodeSize();

        for (let i = 0; i < this.contentItems.length; i++) {
            this._childElementContainer.appendChild(this.contentItems[i].element);
        }

        super.init();

        this.initContentItems();
    }

    addChildFromItemConfig(userItemConfig: UserRowOrColumnItemConfig | UserStackItemConfig | UserComponentItemConfig, 
        index?: number
    ): void {
        const itemConfig = UserItemConfig.resolve(userItemConfig);
        let parent: ContentItem;
        if (this.contentItems.length > 0) {
            parent = this.contentItems[0];          
        } else {
            parent = this;
        }
        const contentItem = this.layoutManager.createAndInitContentItem(itemConfig, parent);
        parent.addChild(contentItem, index);
    }

    addChild(contentItem: ContentItem, index?: number): number {
        if (this.contentItems.length > 0) {
            throw new Error('Root node can only have a single child');
        }

        // contentItem = this.layoutManager._$normalizeContentItem(contentItem, this);
        this._childElementContainer.appendChild(contentItem.element);
        index = super.addChild(contentItem, index);

        this.updateSize();
        this.emitBubblingEvent('stateChanged');

        return index;
    }

    /** @internal */
    calculateConfigContent(): RowOrColumnOrStackParentItemConfig.ChildItemConfig[] {
        const contentItems = this.contentItems;
        const count = contentItems.length;
        const result = new Array<RowOrColumnOrStackParentItemConfig.ChildItemConfig>(count);
        for (let i = 0; i < count; i++) {
            const item = contentItems[i];
            const itemConfig = item.toConfig();
            if (RowOrColumnOrStackParentItemConfig.isChildItemConfig(itemConfig)) {
                result[i] = itemConfig;
            } else {
                throw new AssertError('RCCC66832');
            }
        }
        return result;
    }

    /** @internal */
    setSize(width: number, height: number): void {
        if (width === undefined || height === undefined) {
            this.updateSize(); // For backwards compatibility with v1.x API
        } else {
            setElementWidth(this.element, width);
            setElementHeight(this.element, height);

            // Root can be empty
            if (this.contentItems.length > 0) {
                setElementWidth(this.contentItems[0].element, width);
                setElementHeight(this.contentItems[0].element, height);
            }

            this.updateContentItemsSize();
        }
    }

    updateSize(): void {
        this.updateNodeSize();
        this.updateContentItemsSize();
    }

    /** @internal */
    createSideAreas(): Root.Area[] {
        const areaSize = 50;

        const oppositeSides = Root.Area.oppositeSides;
        const result = new Array<Root.Area>(Object.keys(oppositeSides).length);
        let idx = 0;

        for (const key in oppositeSides) {
            const side = key as keyof Root.Area.Sides;
            const area = this.getElementArea() as Root.Area;
            if (area === null) {
                throw new UnexpectedNullError('RCSA77553');
            } else {
                area.side = side;
                if (oppositeSides[side][1] === '2' )
                    area[side] = area[oppositeSides[side]] - areaSize;
                else
                    area[side] = area[oppositeSides[side]] + areaSize;
                area.surface = (area.x2 - area.x1) * (area.y2 - area.y1);
                result[idx++] = area;
            }
        }

        return result;
    }

    /** @internal */
    highlightDropZone(x: number, y: number, area: AreaLinkedRect): void {
        this.layoutManager.tabDropPlaceholder.remove();
        super.highlightDropZone(x, y, area);
    }

    /** @internal */
    onDrop(contentItem: ContentItem, area: Root.Area): void {

        if (contentItem.isComponent) {
            const itemConfig = StackItemConfig.createDefault();
            // since ItemConfig.contentItems not set up, we need to add header from Component
            const component = contentItem as ComponentItem;
            itemConfig.header = HeaderedItemConfig.Header.createCopy(component.headerConfig);
            const stack = this.layoutManager.createAndInitContentItem(itemConfig, this);
            stack.addChild(contentItem);
            contentItem = stack;
        }

        if (this.contentItems.length === 0) {
            this.addChild(contentItem);
        } else {
            /*
             * If the contentItem that's being dropped is not dropped on a Stack (cases which just passed above and 
             * which would wrap the contentItem in a Stack) we need to check whether contentItem is a RowOrColumn.
             * If it is, we need to re-wrap it in a Stack like it was when it was dragged by its Tab (it was dragged!).
             */
            if(contentItem.config.type === ItemConfig.Type.row || contentItem.config.type === ItemConfig.Type.column){
                const itemConfig = StackItemConfig.createDefault();
                const stack = this.layoutManager.createContentItem(itemConfig, this);
                stack.addChild(contentItem)
                contentItem = stack
            }

            const type = area.side[0] == 'x' ? ItemConfig.Type.row : ItemConfig.Type.column;
            const dimension = area.side[0] == 'x' ? 'width' : 'height';
            const insertBefore = area.side[1] == '2';
            const column = this.contentItems[0];
            if (!(column instanceof RowOrColumn) || column.type !== type) {
                const itemConfig = ItemConfig.createDefault(type);
                const rowOrColumn = this.layoutManager.createContentItem(itemConfig, this);
                this.replaceChild(column, rowOrColumn);
                rowOrColumn.addChild(contentItem, insertBefore ? 0 : undefined, true);
                rowOrColumn.addChild(column, insertBefore ? undefined : 0, true);
                column.config[dimension] = 50;
                contentItem.config[dimension] = 50;
                rowOrColumn.updateSize();
            } else {
                const sibling = column.contentItems[insertBefore ? 0 : column.contentItems.length - 1]
                column.addChild(contentItem, insertBefore ? 0 : undefined, true);
                sibling.config[dimension] *= 0.5;
                contentItem.config[dimension] = sibling.config[dimension];
                column.updateSize();
            }
        }
    }

    /** @internal */
    private updateNodeSize(): void {
        const { width, height } = getElementWidthAndHeight(this._containerElement);

        setElementWidth(this.element, width);
        setElementHeight(this.element, height);

        /*
         * Root can be empty
         */
        if (this.contentItems.length > 0) {
            setElementWidth(this.contentItems[0].element, width);
            setElementHeight(this.contentItems[0].element, height);
        }
    }
}

/** @public */
export namespace Root {
    /** @internal */
    export interface Area extends ContentItem.Area {
        side: keyof typeof Area.Side;
    }

    /** @internal */
    export namespace Area {
        export const enum Side {
            y2,
            x2,
            y1,
            x1,
        }

        export type Sides = { [side in keyof typeof Side]: keyof typeof Side; }

        export const oppositeSides: Sides = {
            y2: 'y1',
            x2: 'x1',
            y1: 'y2',
            x1: 'x2',
        };
    }

    /** @internal */
    export const templateHtml = '<div class="lm_goldenlayout lm_item lm_root"></div>';
}
