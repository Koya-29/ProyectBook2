import { Component, Input } from '@angular/core';
import { EGeneralState, EState, GeneralStateColor, GeneralStateDictionary } from '../../enum';

@Component({
    selector: 'app-text-state',
    standalone: true,
    templateUrl: './text-state.component.html',
    styleUrl: './text-state.component.scss'
})
export class TextStateComponent {
    @Input() state: EState | string | number | undefined;
    @Input() EStateCustom: { [x: string]: string } = GeneralStateDictionary;
    @Input() EStateCustomColor: { [x: string]: string } = GeneralStateColor;

    denomination: string = "";
    color: string = "";

    ngOnChanges(): void {
        this.denomination = this.stateFormat(this.state);
        this.color = this.stateColor(this.state);
    }

    private stateFormat = (state?: EGeneralState | string | number): string => {
        if (state === undefined) return 'Estado no definido';
        return this.EStateCustom[state.toString()] || 'Estado no definido';
    }

    private stateColor = (state?: EGeneralState | string | number): string => {
        if (state === undefined) return 'Estado no definido';
        return this.EStateCustomColor[state.toString()] || 'Estado no definido';
    }
}

export declare interface IState2 {
    label: string;
    color: string;
    icon: string;
    background: string;
}

