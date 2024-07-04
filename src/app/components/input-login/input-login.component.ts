import { Component, Input, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

type InputTypes = "text" | "email" | "password";

@Component({
  selector: 'app-input-login',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputLoginComponent),
      multi: true
    }
  ],
  templateUrl: './input-login.component.html',
  styleUrl: './input-login.component.scss'
})

export class InputLoginComponent implements ControlValueAccessor {
  @Input() type: InputTypes = "text"
  @Input() formPassword: string = ""
  @Input() placeholder: string = ""
  @Input() icon: string = ""

  value: string = ""
  onChange: any = () => { }
  onTouched: any = () => { }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.onChange(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
