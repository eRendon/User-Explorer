import { Component, forwardRef, Input } from '@angular/core'
import { cn } from '../../../libs/utils'
import { NgClass } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { IconComponent } from '../icon/icon.component'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    NgClass,
    IconComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text'
  @Input() placeholder: string = ''
  @Input() class: string = ''
  @Input() disabled: boolean = false
  @Input() icon?: IconDefinition
  private innerValue: string = '';

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.innerValue = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.innerValue = input.value;
    this.onChange(input.value);
  }

  getClasses() {
    return cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      this.class
    );
  }
}
