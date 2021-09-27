package com.Central;

import junit.framework.TestCase;

public class ResponseTest extends TestCase {

    public void testFrom() {
        assertEquals(Response.from(null).status, "400 Bad Request");
    }
}