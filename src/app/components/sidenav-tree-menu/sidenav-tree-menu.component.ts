import { Component, ViewEncapsulation } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './menu-data';

/** File node data with possible child nodes. */
export interface MenuItem {
  name: string;
  path?: string;
  children?: MenuItem[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  level: number;
  path?: string;
  expandable: boolean;
}

@Component({
  selector: 'app-sidenav-tree-menu',
  templateUrl: './sidenav-tree-menu.component.html',
  styleUrls: ['./sidenav-tree-menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SidenavTreeMenuComponent {

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<MenuItem, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<MenuItem, FlatTreeNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = files;
  }

  /** Transform the data to something the tree can read. */
  transformer(node: MenuItem, level: number): FlatTreeNode {
    return {
      name: node.name,
      path: node.path,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  isLevelZero(index: number, node: FlatTreeNode): boolean{
    return node.level == 0;
  }

  isLevelOne(index: number, node: FlatTreeNode): boolean{
    return node.level == 1;
  }

  /** Get the children for the node. */
  getChildren(node: MenuItem): MenuItem[] | null | undefined {
    return node.children;
  }
}
