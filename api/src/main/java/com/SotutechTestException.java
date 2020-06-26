package com;

public class SotutechTestException extends Exception {
private String field;	
public SotutechTestException() {
	// TODO Auto-generated constructor stub
}

public SotutechTestException(String field,String arg0) {
	super(arg0);
	this.field=field;
	// TODO Auto-generated constructor stub
}

public String getField() {
	return field;
}

public void setField(String field) {
	this.field = field;
}

}
